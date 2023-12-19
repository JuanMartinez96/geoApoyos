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

//COSILLAS PAL BRANDON 7W7
import { FormsModule } from '@angular/forms';
import { EncuestaComponent } from './auth/components/encuesta/encuesta.component';
// ng add @angular/common/http
// NOP --> npm install @here/maps-api-for-javascript
// npm install mapbox-gl
// npm install @types/mapbox-gl
import { HttpClientModule } from '@angular/common/http';
import { ListaapoyosComponent } from './auth/components/listaapoyos/listaapoyos.component';
import { FiltroPipe } from './auth/components/listaapoyos/filtro.pipe';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    PaginaPrincipalComponent,
    EncuestaComponent,
    ListaapoyosComponent,
    FiltroPipe,
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

    //COSILLAS PAL BRANDON 7W7
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
