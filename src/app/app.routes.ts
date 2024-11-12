import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

export const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
  },
  {
    path: 'usuario/:id',
    loadComponent: () => import('./components/usuario/usuario.component'),
  },
];
