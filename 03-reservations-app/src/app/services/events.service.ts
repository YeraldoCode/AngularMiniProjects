import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IBooking } from '../models/booking.model';
import { IEvent } from '../models/event.model';
import { first, map, switchMap } from 'rxjs';
import { HaircaresService } from './haircares.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private URL_BASE = `${environment.urlServer}/events`

  private http = inject(HttpClient);
  private haircareService = inject(HaircaresService);

  /**
   * Crea el evento a partir de un booking. Comprobamos si ya existe en una misma hora
   * @param booking 
   * @returns 
   */
  createEvent(booking: IBooking) {

    // Obtenemos la fecha del booking para comprobar si existe
    const formatDate = new Date(`${booking.date}T${booking.time}`).toISOString();
    return this.existsEvent(formatDate).pipe(
      switchMap((exists: boolean) => {
        // Sino existe, obtengo el color del haircare
        if (!exists) {
          return this.haircareService.getColor(booking.haircare);
        } else {
          // Lanzamos error (error de observable lo recoje)
          throw new Error();
        }
      }),
      switchMap((color: string) => {
        // Parseamos el booking a event
        const event: IEvent = {
          start: new Date(formatDate),
          title: booking.name,
          description: booking.haircare,
          backgroundColor: color,
          borderColor: color
        };
        // Insertamos el nuevo evento
        return this.http.post<IEvent>(this.URL_BASE, event).pipe(first())
      })
    )
  }

  /**
   * Obtenemos los eventos
   * @returns 
   */
  getEvents(){
    return this.http.get<IEvent[]>(this.URL_BASE).pipe(first());
  }

  /**
   * Comprueba si existe un evento en la misma fecha
   * @param date 
   * @returns 
   */
  private existsEvent(date: string) {
    return this.http.get<IEvent[]>(`${this.URL_BASE}?start=${date}`).pipe(
      first(),
      map((events: IEvent[]) => events.length > 0)
    )
  }

}
