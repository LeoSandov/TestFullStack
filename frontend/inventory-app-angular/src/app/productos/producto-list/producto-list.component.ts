import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule }                                 from '@angular/common';
import { RouterModule }                                 from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup }  from '@angular/forms';

import { MatTableModule, MatTableDataSource }           from '@angular/material/table';
import { MatPaginatorModule, MatPaginator }             from '@angular/material/paginator';
import { MatButtonModule }                              from '@angular/material/button';
import { MatIconModule }                                from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar }               from '@angular/material/snack-bar';
import { MatFormFieldModule }                           from '@angular/material/form-field';
import { MatSelectModule }                              from '@angular/material/select';

import { ProductoService } from '../../services/producto.service';
import { Producto }        from '../../models/producto.model';

@Component({
  standalone: true,
  selector: 'app-producto-list',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatSelectModule,

    MatTableModule,
    MatPaginatorModule,    // ← necesario
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './producto-list.component.html',
  styleUrls:   ['./producto-list.component.scss']
})
export class ProductoListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Producto>([]);
  displayedColumns = [
    'ndProductoId',
    'imagen',
    'ndProductoNombre',
    'ndProductoPrecioUnitario',
    'ndProductoStock',
    'acciones'
  ];

  filtroForm!: FormGroup;
  categorias: string[] = [];
  private originalProducts: Producto[] = [];

  constructor(
    private fb: FormBuilder,
    private svc: ProductoService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.filtroForm = this.fb.group({ categoria: [''] });
    this.filtroForm.get('categoria')!
      .valueChanges
      .subscribe(cat => this.applyFilter(cat));

    this.cargar();
  }

  ngAfterViewInit() {
    // Conecta el paginator al dataSource
    this.dataSource.paginator = this.paginator;
  }

  cargar() {
    this.svc.listar().subscribe({
      next: prods => {
        this.originalProducts = prods;
        this.dataSource.data    = prods;

        const cats = prods
          .map(p => p.ndProductoCategoria)
          .filter((c): c is string => !!c);
        this.categorias = Array.from(new Set(cats));
      },
      error: () => this.snack.open('Error al cargar','Cerrar',{duration:3000})
    });
  }

  applyFilter(categoria: string) {
    this.dataSource.data = categoria
      ? this.originalProducts.filter(p => p.ndProductoCategoria === categoria)
      : this.originalProducts;
  }

  clearFilter() {
    this.filtroForm.reset();
  }

  eliminar(id: number) {
    this.svc.eliminar(id).subscribe({
      next: () => {
        this.snack.open('Producto eliminado','Cerrar',{duration:2000});
        this.cargar();
      },
      error: () => this.snack.open('Error al eliminar','Cerrar',{duration:3000})
    });
  }
}
