import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss']
})
export class ProductoFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      ndProductoNombre: ['', Validators.required],
      ndProductoDescripcion: [''],
      ndProductoCategoria: [''],
      ndProductoImagenUrl: [''],
      ndProductoPrecioUnitario: [0, [Validators.required, Validators.min(0)]],
      ndProductoStock: [0, [Validators.required, Validators.min(0)]],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.svc.obtener(id).subscribe(prod => this.form.patchValue(prod));
    }
  }

  submit() {
    if (this.form.invalid) return;

    const raw = this.form.value;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const now = new Date().toISOString();

    const body: Partial<Producto> = {
      ndProductoId: id,               // ← lo añadimos
      ndProductoNombre: raw.ndProductoNombre!,
      ndProductoDescripcion: raw.ndProductoDescripcion ?? '',
      ndProductoCategoria: raw.ndProductoCategoria ?? '',
      ndProductoImagenUrl: raw.ndProductoImagenUrl ?? '',
      ndProductoPrecioUnitario: raw.ndProductoPrecioUnitario!,
      ndProductoStock: raw.ndProductoStock!,
      ndProductoCreadoEn: raw.ndProductoCreadoEn || now,
      ndProductoActualizadoEn: now
    };


    if (id) {
      // ** MUY IMPORTANTE: ponemos el id para que el PUT pase la validación **
      body.ndProductoId = id;
    }

    const obs: Observable<Producto | void> = id
      ? this.svc.actualizar(id, body)   // PUT /api/productos/1
      : this.svc.crear(body);           // POST /api/productos

    obs.subscribe({
      next: () => {
        this.snack.open('Guardado con éxito', 'Cerrar', { duration: 2000 });
        this.router.navigate(['/productos']);
      },
      error: () => this.snack.open('Error al guardar', 'Cerrar', { duration: 3000 })
    });
  }
}
