import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IAuth } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, TranslateModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

  // Servicios
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);
  private translateService = inject(TranslateService)
  private router = inject(Router)

  // Form group con los controles del formulario
  public formGroup: FormGroup = new FormGroup({});

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

  }

  login() {

    // Obtenemos los valores del formulario
    const auth: IAuth = this.formGroup.value;
    console.log(auth);

    // Hacemos el login
    this.authService.login(auth).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.toastrService.success(
            this.translateService.instant('login.success'),
            this.translateService.instant('success')
          );
          // redirigimos a los eventos
          this.router.navigateByUrl('events-calendar')
        } else {
          this.toastrService.error(
            this.translateService.instant('login.error'),
            this.translateService.instant('error')
          )
        }
      }
    })


  }

}
