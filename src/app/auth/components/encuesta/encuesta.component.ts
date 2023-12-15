import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { I_agregarCandidato } from 'src/app/interfaces/candidatos';
import { S_apoyos } from 'src/app/servicios/apoyos.service';
import { S_extras } from 'src/app/servicios/extras.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit{
  candidato: I_agregarCandidato = {
    nombre:"juan",
    edad:27,
    institucion:"utl",
    grado_escolaridad:"string",
    id_tipo_apoyo:1,
    id_estatus:1,

    estado:"guanajuato",
    municipio:"leon",

    colonia:"ermita",
    calle:"eros",
    entre_calles:"eros",
    no_int:1,
    no_ext:"2011",
    
    fotografia:"string",
    latitud:1,
    longitud:1,
  }
  hay_ubucacion = false;
  apoyos_lista: string[] = [];
  apoyos_estatus: string[] = [];

  estado_lista: string[] = [];
  municipio_lista: string[] = [];

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  imageUrl: string = '';


  showMenu = false;
  toggleMenu() {this.showMenu = !this.showMenu;}

  constructor(
    private API_apoyo: S_apoyos,
    private API_extras: S_extras
  ){
  }
  ngOnInit(){
    
    this.API_extras.getEstados().subscribe((r)=>{
      this.estado_lista = r.estados;
      this.candidato.estado = r.estados[0];
      this.getMunicipios();
    });
    
    this.API_apoyo.getApoyos().subscribe((r)=>{
      this.apoyos_lista = r.apoyo;
      this.candidato.id_tipo_apoyo = 0;
    });
    this.API_apoyo.getApoyosStatus().subscribe((r)=>{
      this.apoyos_estatus = r.apoyo_estatus;
      this.candidato.id_estatus = 0;
    });
  }

  onSubmit(form: NgForm){
    if (this.hay_ubucacion == true) {
      console.log('Formulario enviado:', form.value);
    }else{
      alert('AUN NO REVISA SU UBICACION');
    }
  }

  getMunicipios(){
    this.API_extras.getMunicipios(this.candidato.estado).subscribe((r)=>{
      this.municipio_lista = r.municipios;
    });
  }
  getCoordenadas(){
    if (
      this.candidato.municipio.length >= 4 &&
      this.candidato.estado.length >= 4 &&
      this.candidato.colonia.length >= 4 &&
      this.candidato.calle.length >= 4
      ) {

      this.API_extras.getCoordenadar(
        {direccion:`${this.candidato.municipio} ${this.candidato.estado} ${this.candidato.colonia} ${this.candidato.calle}`}
        ).subscribe((r)=>{
          this.candidato.latitud = r.latitud;
          this.candidato.longitud = r.longitud;

          this.hay_ubucacion = true;
        });
    }else{
      alert('Se requieren datos');
    }
    
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
