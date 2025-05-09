// src/app/services/producto.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

interface ProductoWrapper {
  producto: Producto;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = 'http://localhost:5166/api/productos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }

  obtener(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/${id}`);
  }

  crear(p: Partial<Producto>): Observable<Producto> {
    const now = new Date().toISOString();
    // construye el objeto plano tal y como tu API espera
    const body: Partial<Producto> & { ndProductoCreadoEn: string, ndProductoActualizadoEn: string } = {
      ndProductoNombre:        p.ndProductoNombre!,
      ndProductoDescripcion:   p.ndProductoDescripcion   ?? '',
      ndProductoCategoria:     p.ndProductoCategoria     ?? '',
      ndProductoImagenUrl:     p.ndProductoImagenUrl     ?? '',
      ndProductoPrecioUnitario:p.ndProductoPrecioUnitario!,
      ndProductoStock:         p.ndProductoStock!,
      ndProductoCreadoEn:      now,
      ndProductoActualizadoEn: now
    };
    return this.http.post<Producto>(this.baseUrl, body);
  }
  
  actualizar(id: number, p: Partial<Producto>): Observable<void> {
    const now = new Date().toISOString();
    const body: Partial<Producto> & { ndProductoActualizadoEn: string } = {
      ndProductoNombre:        p.ndProductoNombre!,
      ndProductoDescripcion:   p.ndProductoDescripcion   ?? '',
      ndProductoCategoria:     p.ndProductoCategoria     ?? '',
      ndProductoImagenUrl:     p.ndProductoImagenUrl     ?? '',
      ndProductoPrecioUnitario:p.ndProductoPrecioUnitario!,
      ndProductoStock:         p.ndProductoStock!,
      ndProductoActualizadoEn: now
    };
    return this.http.put<void>(`${this.baseUrl}/${id}`, body);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
