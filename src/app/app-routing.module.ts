import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './auth/components/index/index.component';
import { LoginComponent } from './auth/components/login/login.component';
import { PaginaPrincipalComponent } from './auth/components/pagina-principal/pagina-principal.component';

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
    path: '',
    redirectTo: 'index', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
