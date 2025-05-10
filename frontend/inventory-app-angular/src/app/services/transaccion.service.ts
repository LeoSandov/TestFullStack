import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion.model';

@Injectable({ providedIn: 'root' })
export class TransaccionService {
  private baseUrl = 'http://localhost:5062/api/transacciones';

  constructor(private http: HttpClient) {}

  listar(
    productoId?: number,
    tipo?: string,
    fechaDesde?: Date,
    fechaHasta?: Date
  ): Observable<Transaccion[]> {
    let params = new HttpParams();

    if (productoId != null) {
      params = params.set('productoId', productoId.toString());
    }
    if (tipo) {
      params = params.set('tipo', tipo);
    }
    if (fechaDesde) {
      // Convertimos la Date a ISO string
      params = params.set('fechaDesde', fechaDesde.toISOString());
    }
    if (fechaHasta) {
      params = params.set('fechaHasta', fechaHasta.toISOString());
    }

    return this.http.get<Transaccion[]>(this.baseUrl, { params });
  }

  obtener(id: number): Observable<Transaccion> {
    return this.http.get<Transaccion>(`${this.baseUrl}/${id}`);
  }

  crear(t: Partial<Transaccion>): Observable<Transaccion> {
    return this.http.post<Transaccion>(this.baseUrl, t);
  }

  actualizar(id: number, t: Partial<Transaccion>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, t);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  
}
