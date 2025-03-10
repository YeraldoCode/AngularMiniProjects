import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs';
import { IHaircare } from '../models/haircare.model';

@Injectable({
  providedIn: 'root'
})
export class HaircaresService {

  private URL_BASE = `${environment.urlServer}/haircares`

  private http = inject(HttpClient);

  /**
   * Obtenemos los haircares
   * @returns 
   */
  getHaircares(){
    return this.http.get<IHaircare[]>(this.URL_BASE).pipe(first())
  }
  
  /**
   * Obtenemos el color de un haircare especifico
   * @param haircare 
   * @returns 
   */
  getColor(haircare: string){
    return this.http.get<IHaircare[]>(`${this.URL_BASE}?value=${haircare}`).pipe(
      first(),
      map( (haircares: IHaircare[]) => haircares[0]?.color )
    )
  }
  
}
