import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  I_agregarCandidato,
  candidatos,
  R_Candidatos,
  visita,
  UpdateStatus,
} from 'src/app/interfaces/candidatos';
import { S_apoyos } from 'src/app/servicios/apoyos.service';
import { S_extras } from 'src/app/servicios/extras.service';
import { S_cadidatos } from 'src/app/servicios/cadidatos.service';
import { R_usuarios } from 'src/app/interfaces/usuarios';
import { S_auth } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './listaapoyos.component.html',
  styleUrls: ['./listaapoyos.component.css'],
})
export class ListaapoyosComponent implements OnInit {
  loggedInUser: R_usuarios | null = null;
  lista_candidatos: candidatos[] = [];
  apoyos_lista: string[] = [];
  apoyos_estatus: string[] = [];
  filtro: string = '';
  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  menuItems = [
    {
      label: 'Registro de\nCandidatos',
      link: '/registro',
      backgroundColor: '#00548F',
      icon: '/assets/libro.png',
    },
    {
      label: 'Estatus de\nVisita',
      link: '/visitas',
      backgroundColor: '#606060',
      icon: '/assets/camion.png',
    },
    {
      label: 'Permisos de\nUsuario',
      link: '/permisos',
      backgroundColor: '#F28629',
      icon: '/assets/contacto.png',
    },
  ];

  constructor(
    public authService: S_auth,
    private API_apoyo: S_apoyos,
    private API_extras: S_extras,
    private API_candidato: S_cadidatos,
    private router: Router // private datePipe: DatePipe
  ) {}
  ngOnInit() {
    // this.API_candidato.GetVisitas().subscribe((r)=>{
    //   this.lista_candidatos = r.visitas;
    // });
    this.API_candidato.GetCandidatos().subscribe((r) => {
      this.lista_candidatos = r.candidatos;
      // console.log(r.candidatos);
    });
    this.API_apoyo.getApoyos().subscribe((r) => {
      this.apoyos_lista = r.apoyo;
    });
    this.API_apoyo.getApoyosStatus().subscribe((r) => {
      this.apoyos_estatus = r.apoyo_estatus;
    });

    //Codigo para navbar
    const loggedInUser: R_usuarios = this.authService.getLoggedInUser();

    if (loggedInUser) {
      const userNameElement = document.querySelector('.user-name');
      if (userNameElement) {
        userNameElement.textContent = loggedInUser.nombre;
      }
      const userPermissionElement = document.querySelector('.user-permission');
      if (
        userPermissionElement &&
        loggedInUser &&
        loggedInUser.id_rol !== undefined
      ) {
        userPermissionElement.textContent = loggedInUser.id_rol.toString();
      }
    }
  }

  obtenerFechaFormateada(fechaString: string): string {
    const date = new Date(fechaString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  //cierre de sesion
  logout() {
    const userId = 3;

    this.authService.logout(userId).subscribe((response) => {
      console.log('Logout exitoso:', response);
      this.router.navigate(['/login']);
    });
  }

  viewSupportsList() {
    this.router.navigate(['/listaApoyos']);
  }
  updateStatus(id_candidato: number, index: number) {
    // console.log(id_candidato + ' ->'+this.lista_candidatos[index].id_estatus);
    const new_status: UpdateStatus = {
      id_status_apoyo: this.lista_candidatos[index].id_estatus,
    };
    this.API_candidato.UpdateCandidatoStatus(
      new_status,
      id_candidato
    ).subscribe((r) => {
      console.log(r);
    });
  }

  exportToPdf() {
    const doc = new jsPDF();
    const columns = [
      'Nombre',
      'StatusApoyo',
      'Visitado',
      'StatusEncuesta',
      'AsignarVisita',
      'FechaVisita',
      'Catalogo',
    ];

    const rows: any[] = [];

    this.lista_candidatos.forEach((item) => {
      const visitado = item.id_estatus == 1 ? 'Sí' : 'No';
      const encuestado = item.id_estatus == 1 ? 'No Encuestado' : 'Encuestado';
      const status = this.apoyos_estatus[item.id_estatus - 1];
      const fechaVisita = this.obtenerFechaFormateada(item.updated_at);

      rows.push([
        item.nombre,
        status,
        visitado,
        encuestado,
        item.nombre, // Asignar visita
        fechaVisita,
        status,
      ]);
    });
    console.log(rows);

    const columnStyles = {
      Nombre: { cellWidth: 15 },
      StatusApoyo: { cellWidth: 10 },
      Visitado: { cellWidth: 10 },
      StatusEncuesta: { cellWidth: 10 },
      AsignarVisita: { cellWidth: 10 },
      FechaVisita: { cellWidth: 10 },
      Catalogo: { cellWidth: 10 },
    };

    autoTable(doc, {
      head: [columns],
      body: rows,
      columnStyles: columnStyles,
    });
    //autoTable(doc, { html: '#my-table1' });
    doc.save('Reporte_Candidatos.pdf');
  }
}
