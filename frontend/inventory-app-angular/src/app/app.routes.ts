import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { HomeComponent }            from './home/home.component';
import { ProductoListComponent }    from './productos/producto-list/producto-list.component';
import { ProductoFormComponent }    from './productos/producto-form/producto-form.component';
import { TransaccionListComponent } from './transacciones/transaccion-list/transaccion-list.component';
import { TransaccionFormComponent } from './transacciones/transaccion-form/transaccion-form.component';

export const appRoutes = [
  { path: '',             component: HomeComponent },
  { path: 'productos',    component: ProductoListComponent },
  { path: 'productos/nuevo',       component: ProductoFormComponent },
  { path: 'productos/editar/:id',  component: ProductoFormComponent },
  
  { path: 'transacciones',          component: TransaccionListComponent },
  { path: 'transacciones/nueva',  component: TransaccionFormComponent },
  { path: 'transacciones/editar/:id', component: TransaccionFormComponent },
  { path: '**',          redirectTo: '' }
];

export const appRoutingProviders = [
  provideRouter(appRoutes, withEnabledBlockingInitialNavigation())
];
