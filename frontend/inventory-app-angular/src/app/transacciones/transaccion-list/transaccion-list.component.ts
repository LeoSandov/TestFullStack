import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule }                                 from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup }  from '@angular/forms';
import { RouterModule }                                 from '@angular/router';

import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule      } from '@angular/material/input';
import { MatSelectModule     } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule     } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator  } from '@angular/material/paginator';
import { MatIconModule       } from '@angular/material/icon';
import { MatTooltipModule    } from '@angular/material/tooltip';

import { TransaccionService } from '../../services/transaccion.service';
import { Transaccion }        from '../../models/transaccion.model';

@Component({
  standalone: true,
  selector: 'app-transaccion-list',
  templateUrl: './transaccion-list.component.html',
  styleUrls: ['./transaccion-list.component.scss'],
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
    MatSnackBarModule,

    MatTableModule,
    MatPaginatorModule,  // ← para la paginación
    MatIconModule,
    MatTooltipModule
  ]
})
export class TransaccionListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    'ndTransaccionDetalle',
    'acciones'
  ];

  constructor(
    private fb: FormBuilder,
    private svc: TransaccionService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.filtroForm = this.fb.group({
      productoId: [''],
      tipo:       [''],
      fechaDesde: [''],
      fechaHasta: ['']
    });
    this.cargar();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargar() {
    const { productoId, tipo, fechaDesde, fechaHasta } = this.filtroForm.value;
    this.svc.listar(productoId, tipo, fechaDesde, fechaHasta).subscribe({
      next: txs => this.dataSource.data = txs,
      error: ()  => this.snack.open('Error al cargar', 'Cerrar', { duration: 3000 })
    });
  }

  limpiar() {
    this.filtroForm.reset();
    this.cargar();
  }
}
