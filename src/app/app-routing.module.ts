import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './auth/components/index/index.component';
import { LoginComponent } from './auth/components/login/login.component';
import { PaginaPrincipalComponent } from './auth/components/pagina-principal/pagina-principal.component';
import { EstatusComponent } from './auth/components/estatus/estatus.component';
import { PermisosComponent } from './auth/components/permisos/permisos.component';
import { RegistroComponent } from './auth/components/registro/registro.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'principal',
    component: PaginaPrincipalComponent
  },
  {
    path: 'estatus',
    component: EstatusComponent
  },
  {
    path: 'permisos',
    component: PermisosComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: '',
    redirectTo: 'index', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
