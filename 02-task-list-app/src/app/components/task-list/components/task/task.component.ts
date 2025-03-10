import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../../../models/task.model';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  // Inputs
  @Input({ required: true }) task!: ITask; // ! indica al compilar que le vamos a dar valor
  @Input() index: number = 0;
  // Outputs
  @Output() remove: EventEmitter<number> = new EventEmitter<number>();
  @Output() complete: EventEmitter<number> = new EventEmitter<number>();

  removeTask() {
    // Envia al componente padre el indice de la tarea a eliminar
    this.remove.emit(this.index);
  }

  completeTask() {
    // Envia al componente padre el indice de la tarea a completar
    this.complete.emit(this.index);
  }

}
