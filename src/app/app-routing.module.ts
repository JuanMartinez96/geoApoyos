import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './auth/components/index/index.component';
import { LoginComponent } from './auth/components/login/login.component';
import { PaginaPrincipalComponent } from './auth/components/pagina-principal/pagina-principal.component';
import {EncuestaComponent} from './auth/components/encuesta/encuesta.component';
import { ListaapoyosComponent } from './auth/components/listaapoyos/listaapoyos.component';

const routes: Routes = [
  {path: '',redirectTo: 'index', pathMatch: 'full'},
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
    path:'encuesta',
    component:EncuestaComponent
  },
  {
    path:'lista_apoyos',
    component:ListaapoyosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
