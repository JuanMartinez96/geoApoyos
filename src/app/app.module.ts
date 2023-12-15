//Importaciones de angular por instalaciones
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

//Las weas que yo mismo importo
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './auth/components/index/index.component';
import { MaterialModule } from './auth/material/material.module';
import { LoginComponent } from './auth/components/login/login.component';
import { PaginaPrincipalComponent } from './auth/components/pagina-principal/pagina-principal.component';
import { RegistroComponent } from './auth/components/registro/registro.component';
import { PermisosComponent } from './auth/components/permisos/permisos.component';
import { FormularioVisitaComponent } from './auth/components/formulario-visita/formulario-visita.component';




@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    PaginaPrincipalComponent,
    RegistroComponent,
    PermisosComponent,
    FormularioVisitaComponent,
  ],
  imports: [
    //Lo de Angular
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    //Mis importaciones, componentes
    AppRoutingModule,
    MaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
