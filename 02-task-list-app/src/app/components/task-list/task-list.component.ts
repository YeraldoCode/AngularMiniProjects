import { Component } from '@angular/core';
import { ITask } from '../../models/task.model';
import { TaskComponent } from './components/task/task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  // Atributos

  // Tareas pendientes
  public taskListPending: ITask[] = [];
  // Tareas completadas
  public taskListCompleted: ITask[] = [];
  // Indica si muestro el input para añadir una tarea
  public showInputTask: boolean = false;
  // Indica si muestro el error al añadir una tarea
  public errorInputTask: boolean = false;
  // Indica si muestro o no las tareas completadas
  public showCompleted: boolean = false;

  /**
   * 
   */
  showInputTextTask() {
    this.showInputTask = true;
  }

  /**
   * Crea un task pasandole una descripción
   * @param description 
   */
  createTask(description: string) {
    // trim elimina los espacios de delante y atras
    // Esto evita que podamos poner espacios vacios
    if (description.trim()) {
      // Creo un task
      const task: ITask = {
        date: new Date(),
        description: description.trim(),
        completed: false
      }

      // Lo añado en pendientes
      this.taskListPending.push(task);
      this.showInputTask = false;
      console.log(this.taskListPending);
      this.errorInputTask = false;
    } else {
      // Mostramos que ha habido un error
      this.errorInputTask = true;
    }
  }

  /**
   * Eliminamos una tarea dada un indice
   * @param index 
   */
  removeTask(index: number) {
    console.log(index);
    // Borramos una tarea con splice
    this.taskListPending.splice(index, 1);
  }

  completeTask(index: number) {
    console.log(index);
    // Obtenemos el task dada un indice
    const task = this.taskListPending[index];
    // Actualizamos las propiedades de la tarea
    task.completed = true;
    task.date = new Date();
    // Borramos una tarea con splice
    this.taskListPending.splice(index, 1);
    // Lo añadimos a completados
    this.taskListCompleted.push(task);
  }

  toggleShowCompleted() {
    // Cambia el valor showCompleted
    this.showCompleted = !this.showCompleted;
  }

}
