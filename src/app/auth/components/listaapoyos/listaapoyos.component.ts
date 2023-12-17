import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { I_agregarCandidato,candidatos,R_Candidatos,visita } from 'src/app/interfaces/candidatos';
import { S_apoyos } from 'src/app/servicios/apoyos.service';
import { S_extras } from 'src/app/servicios/extras.service';
import { S_cadidatos } from 'src/app/servicios/cadidatos.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './listaapoyos.component.html',
  styleUrls: ['./listaapoyos.component.css']
})
export class ListaapoyosComponent implements OnInit{
  lista_candidatos: visita[] = []
  apoyos_lista: string[] = [];
  apoyos_estatus: string[] = [];

  filtro: string = '';

  showMenu = false;
  toggleMenu() {this.showMenu = !this.showMenu;}

  constructor(
    private API_apoyo: S_apoyos,
    private API_extras: S_extras,
    private API_candidato: S_cadidatos,
    // private datePipe: DatePipe
  ){
    
    
  }
  ngOnInit(){    
    
    this.API_candidato.GetVisitas().subscribe((r)=>{
      this.lista_candidatos = r.visitas;
    });
    this.API_apoyo.getApoyos().subscribe((r)=>{this.apoyos_lista=r.apoyo});
    this.API_apoyo.getApoyosStatus().subscribe((r)=>{this.apoyos_estatus=r.apoyo_estatus});

    

  }

  obtenerFechaFormateada(fechaString:string): string {
    const date = new Date(fechaString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  
}
