import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';   // <- importa ReactiveFormsModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatSelectModule }    from '@angular/material/select';
import { MatDatepickerModule }from '@angular/material/datepicker';
import { MatNativeDateModule }from '@angular/material/core';
import { MatButtonModule }    from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule }     from '@angular/material/table';

import { TransaccionService } from '../../services/transaccion.service';
import { Transaccion }        from '../../models/transaccion.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transaccion-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,      // <-- ¡aquí!
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule
  ],
  templateUrl: './transaccion-list.component.html',
  styleUrls: ['./transaccion-list.component.scss']
})
export class TransaccionListComponent implements OnInit {
  filtroForm!: FormGroup;
  dataSource = new MatTableDataSource<Transaccion>([]);
  displayedColumns = [
    'ndTransaccionId',
    'ndTransaccionFecha',
    'ndTransaccionTipo',
    'ndTransaccionProductoId',
    'ndTransaccionCantidad',
    'ndTransaccionPrecioUnitario',
    'ndTransaccionTotal',
    'ndTransaccionDetalle'
  ];

  constructor(
    private fb: FormBuilder,
    private svc: TransaccionService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.filtroForm = this.fb.group({
      productoId: [''],
      tipo: [''],
      fechaDesde: [''],
      fechaHasta: ['']
    });
    this.cargar();
  }

  cargar() {
    const { productoId, tipo, fechaDesde, fechaHasta } = this.filtroForm.value;
    this.svc.listar(productoId, tipo, fechaDesde, fechaHasta).subscribe({
      next: txs => this.dataSource.data = txs,
      error: ()  => this.snack.open('Error al cargar','Cerrar',{duration:3000})
    });
  }

  limpiar() {
    this.filtroForm.reset();
    this.cargar();
  }
}
