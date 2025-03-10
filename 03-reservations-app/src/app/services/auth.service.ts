import { Injectable } from '@angular/core';
import { IAuth } from '../models/auth.model';
import { BehaviorSubject, first, of, startWith, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Subject para saber si estamos logueados o no
  private subjectAuth = new BehaviorSubject<boolean>(localStorage.getItem('isLogged') === "true");
  // Observable a partir del subject
  public isAuthenticated$ = this.subjectAuth.asObservable();
  
  /**
   * Nos loguea en la aplicación
   * @param authCredentials 
   * @returns 
   */
  login(authCredentials: IAuth){

    let success = false;
    // Si coincide con un usuario concreto
    if(authCredentials.email == 'ddr@gmail.com' && authCredentials.password == '123456'){
      success = true;
      // Guardamos en el localstorage que estamos logueados
      localStorage.setItem('isLogged', 'true');
      // Avisamos a los observables del nuevo estado
      this.subjectAuth.next(true);
    }

    return of(success).pipe(first())

  }

  /**
   * Nos desloguea de la aplicación
   * @returns 
   */
  logout(){
    // Eliminamos isLogged del localstorage
    localStorage.removeItem('isLogged');
     // Avisamos a los observables del nuevo estado
    this.subjectAuth.next(false);
    return of(true).pipe(first())
  }

}
