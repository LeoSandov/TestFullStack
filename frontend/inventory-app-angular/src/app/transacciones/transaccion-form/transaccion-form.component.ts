import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  RouterModule,
  Router,
  ActivatedRoute
} from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { TransaccionService } from '../../services/transaccion.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { Transaccion } from '../../models/transaccion.model';
import { NO_SPECIAL_CHARS } from '../../utils/validators';
@Component({
  standalone: true,
  selector: 'app-transaccion-form',
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
  stockDisponible = 0;

  editar = false;
  idTransaccion!: number;

  constructor(
    private fb: FormBuilder,
    private svc: TransaccionService,
    private prodSvc: ProductoService,
    private router: Router,
    private snack: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.form = this.fb.group({
      ndTransaccionTipo: ['compra', [Validators.required,]],
      ndTransaccionProductoId: [null, [Validators.required]],
      ndTransaccionCantidad: [0, [Validators.required, Validators.min(1)]],
      ndTransaccionPrecioUnitario: [0, [Validators.required, Validators.min(0)]],
      ndTransaccionDetalle: ['', [Validators.pattern(NO_SPECIAL_CHARS)]]
    });

    
    this.prodSvc.listar().subscribe(prods => {
      this.productos = prods;
      
      this.watchProductoYTipo();
    });

    
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editar = true;
      this.idTransaccion = +idParam;
      this.svc.obtener(this.idTransaccion).subscribe(tx => {
        this.form.patchValue({
          ndTransaccionTipo: tx.ndTransaccionTipo,
          ndTransaccionProductoId: tx.ndTransaccionProductoId,
          ndTransaccionCantidad: tx.ndTransaccionCantidad,
          ndTransaccionPrecioUnitario: tx.ndTransaccionPrecioUnitario,
          ndTransaccionDetalle: tx.ndTransaccionDetalle
        });
        
        this.updateStock(tx.ndTransaccionProductoId);
        this.updateValidators();
      });
    } else {
      
      this.watchProductoYTipo();
    }
  }

  
  private watchProductoYTipo() {
    this.form.get('ndTransaccionProductoId')!
      .valueChanges
      .subscribe(prodId => this.updateStock(prodId));

    this.form.get('ndTransaccionTipo')!
      .valueChanges
      .subscribe(() => this.updateValidators());
  }

  
  private updateStock(prodId: number) {
    const prod = this.productos.find(p => p.ndProductoId === prodId);
    this.stockDisponible = prod ? prod.ndProductoStock : 0;
    this.updateValidators();
  }

  
  private updateValidators() {
    const cantidadCtl = this.form.get('ndTransaccionCantidad')!;
    const validators = [Validators.required, Validators.min(1)];

    if (this.form.value.ndTransaccionTipo === 'venta') {
      validators.push(Validators.max(this.stockDisponible));
    }

    cantidadCtl.setValidators(validators);
    cantidadCtl.updateValueAndValidity({ emitEvent: false });
  }

  submit() {
    if (this.form.invalid) return;
    const data = this.form.value as Transaccion;

    
    const delta = data.ndTransaccionTipo === 'compra'
      ? data.ndTransaccionCantidad
      : -data.ndTransaccionCantidad;

    if (this.editar) {
      
      data.ndTransaccionId = this.idTransaccion;

      this.svc.actualizar(this.idTransaccion, data).subscribe({
        next: () => {
          this.prodSvc.ajustarStock(data.ndTransaccionProductoId, delta)
            .subscribe({
              next: () => {
                this.snack.open(
                  'Transacción y stock actualizados',
                  'Cerrar',
                  { duration: 2000 }
                );
                this.router.navigate(['/transacciones']);
              },
              error: () => this.snack.open(
                'Transacción actualizada pero fallo stock',
                'Cerrar',
                { duration: 3000 }
              )
            });
        },
        error: () => this.snack.open(
          'Error al actualizar transacción',
          'Cerrar',
          { duration: 3000 }
        )
      });
    } else {
      
      this.svc.crear(data).subscribe({
        next: () => {
          this.prodSvc.ajustarStock(data.ndTransaccionProductoId, delta)
            .subscribe({
              next: () => {
                this.snack.open(
                  'Transacción registrada y stock ajustado',
                  'Cerrar',
                  { duration: 2000 }
                );
                this.router.navigate(['/transacciones']);
              },
              error: () => this.snack.open(
                'Transacción registrada pero fallo stock',
                'Cerrar',
                { duration: 3000 }
              )
            });
        },
        error: () => this.snack.open(
          'Error al registrar transacción',
          'Cerrar',
          { duration: 3000 }
        )
      });
    }
  }
}
