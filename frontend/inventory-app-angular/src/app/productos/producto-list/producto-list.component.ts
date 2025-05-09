import { Component, OnInit } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { RouterModule }    from '@angular/router';
import { MatTableModule }  from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule }   from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductoService } from '../../services/producto.service';
import { Producto }        from '../../models/producto.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss']
})
export class ProductoListComponent implements OnInit {
  dataSource = new MatTableDataSource<Producto>([]);
  displayedColumns = [
    'ndProductoId',
    'imagen',                 // ← nueva columna
    'ndProductoNombre',
    'ndProductoPrecioUnitario',
    'ndProductoStock',
    'acciones'
  ];

  constructor(
    private svc: ProductoService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.svc.listar().subscribe({
      next: prods => this.dataSource.data = prods,
      error: ()    => this.snack.open('Error al cargar productos','Cerrar',{duration:3000})
    });
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
