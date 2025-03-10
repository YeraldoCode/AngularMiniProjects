import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IHour } from '../models/hour.model';

@Injectable({
  providedIn: 'root'
})
export class HoursService {

  private URL_BASE = `${environment.urlServer}/hours`

  private http = inject(HttpClient);

  /**
   * Obtengo las horas
   * @returns 
   */
  getHours() {
    return this.http.get<IHour[]>(this.URL_BASE).pipe(first())
  }


}
