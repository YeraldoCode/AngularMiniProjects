import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Comprobamos si tenemos el item isLogged en el localstorage
  const loggedIn = localStorage.getItem('isLogged') === "true";

  // Si esta, podemos entrar en la ruta
  if(loggedIn){
    return true;
  }else{
    // Obtenemos el router y redirigimos al usuario al login
    const router = inject(Router);
    router.navigateByUrl('login');
    return false;
  }
};
