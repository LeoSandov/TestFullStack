import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatSelectModule }    from '@angular/material/select';
import { MatDatepickerModule }from '@angular/material/datepicker';
import { MatNativeDateModule }from '@angular/material/core';
import { MatButtonModule }    from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TransaccionService } from '../../services/transaccion.service';
import { ProductoService }    from '../../services/producto.service';
import { Producto }           from '../../models/producto.model';

@Component({
  selector: 'app-transaccion-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './transaccion-form.component.html',
  styleUrls: ['./transaccion-form.component.scss']
})
export class TransaccionFormComponent implements OnInit {
  form!: FormGroup;
  productos: Producto[] = [];

  constructor(
    private fb: FormBuilder,
    private svc: TransaccionService,
    private prodSvc: ProductoService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    // Inicializa el formulario
    this.form = this.fb.group({
      ndTransaccionTipo: ['compra', Validators.required],
      ndTransaccionProductoId: [null, Validators.required],
      ndTransaccionCantidad: [0, [Validators.required, Validators.min(1)]],
      ndTransaccionPrecioUnitario: [0, [Validators.required, Validators.min(0)]],
      ndTransaccionDetalle: ['']
    });

    // Carga productos para el select
    this.prodSvc.listar().subscribe(prods => this.productos = prods);
  }

  submit() {
    if (this.form.invalid) return;
    const data = this.form.value;

    // Validar stock
    const prod = this.productos.find(p => p.ndProductoId === data.ndTransaccionProductoId)!;
    if (data.ndTransaccionCantidad > prod.ndProductoStock) {
      this.snack.open('Stock insuficiente', 'Cerrar', { duration: 3000 });
      return;
    }

    this.svc.crear(data).subscribe({
      next: () => {
        this.snack.open('Transacción registrada', 'Cerrar', { duration: 2000 });
        this.router.navigate(['/transacciones']);
      },
      error: () => this.snack.open('Error al registrar', 'Cerrar', { duration: 3000 })
    });
  }
}