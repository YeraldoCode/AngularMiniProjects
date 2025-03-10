import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: '',
    imports: [],
    template: ''
})
export class LogoutComponent {

  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);
  private translateService = inject(TranslateService);
  private router = inject(Router)

  ngOnInit(){

    // Hacemos el logout de la aplicacion
    // Cuando termine, mostraremos un mensaje y redirigimos a add-booking
    this.authService.logout().subscribe({
      next: () => {
        this.toastrService.success(
          this.translateService.instant('logout.success'),
          this.translateService.instant('success')
        )
        this.router.navigateByUrl('add-booking')
      }
    })

  }


}
