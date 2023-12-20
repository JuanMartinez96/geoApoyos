import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as jsPDF from 'jspdf';

import { I_agregarCandidato,candidatos,R_Candidatos,visita } from 'src/app/interfaces/candidatos';
import { S_apoyos } from 'src/app/servicios/apoyos.service';
import { S_extras } from 'src/app/servicios/extras.service';
import { S_cadidatos } from 'src/app/servicios/cadidatos.service';
import { R_usuarios } from 'src/app/interfaces/usuarios';
import { S_auth } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './listaapoyos.component.html',
  styleUrls: ['./listaapoyos.component.css']
})
export class ListaapoyosComponent implements OnInit{

  loggedInUser: R_usuarios | null = null;
  lista_candidatos: visita[] = []
  apoyos_lista: string[] = [];
  apoyos_estatus: string[] = [];
  filtro: string = '';
  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  menuItems = [
    { label: 'Registro de\nCandidatos', link: '/registro', backgroundColor: '#00548F', icon: '/assets/libro.png' },
    { label: 'Estatus de\nVisita', link: '/visitas', backgroundColor: '#606060', icon: '/assets/camion.png' },
    { label: 'Permisos de\nUsuario', link: '/permisos', backgroundColor: '#F28629', icon: '/assets/contacto.png' }
  ];


  constructor(
    public authService: S_auth,
    private API_apoyo: S_apoyos,
    private API_extras: S_extras,
    private API_candidato: S_cadidatos,
    private router: Router
    // private datePipe: DatePipe
  ){


  }
  ngOnInit(){

    this.API_candidato.GetVisitas().subscribe((r)=>{
      this.lista_candidatos = r.visitas;
    });
    this.API_apoyo.getApoyos().subscribe((r)=>{this.apoyos_lista=r.apoyo});
    this.API_apoyo.getApoyosStatus().subscribe((r)=>{this.apoyos_estatus=r.apoyo_estatus});


    //Codigo para navbar
    const loggedInUser: R_usuarios = this.authService.getLoggedInUser();

    if (loggedInUser) {
      const userNameElement = document.querySelector('.user-name');
      if (userNameElement) {
        userNameElement.textContent = loggedInUser.nombre;
      }
      const userPermissionElement = document.querySelector('.user-permission');
      if (userPermissionElement && loggedInUser && loggedInUser.id_rol !== undefined) {
        userPermissionElement.textContent = loggedInUser.id_rol.toString();
      }
    }
  }

  obtenerFechaFormateada(fechaString:string): string {
    const date = new Date(fechaString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  //cierre de sesion
  logout() {
    const userId = 3;

    this.authService.logout(userId).subscribe(
      (response) => {
        console.log('Logout exitoso:', response);
        this.router.navigate(['/login']);
      },
    );
  }

  viewSupportsList(){
    this.router.navigate(['/listaApoyos']);
  }

  exportarPDF(): void {
    // Configuración básica del documento PDF
    const pdf = new jsPDF('p', 'pt');
    const options = {
      theme: 'striped',
      styles: {
        font: 'helvetica',
        overflow: 'linebreak',
      },
    };

    const content = document.getElementById('tablaExportar');
    pdf.autoTable(content, options);
    pdf.save('lista_candidatos.pdf');
  }
}


