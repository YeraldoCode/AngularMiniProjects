import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-header',
    imports: [RouterLink, TranslateModule, RouterLinkActive, AsyncPipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // Servicios
  private translateService = inject(TranslateService);
  private authService = inject(AuthService);

  // Idiomas disponibles
  public languages: string[] = ['es', 'en'];
  // Observable para saber si estamos o no logueados
  public isAuthenticated$ = this.authService.isAuthenticated$;

  /**
   * Cambia el idioma de la aplicacion
   * @param language 
   */
  changeLanguage(language: string) {
    this.translateService.use(language);
  }

}
