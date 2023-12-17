import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { I_agregarCandidato } from 'src/app/interfaces/candidatos';
import { S_apoyos } from 'src/app/servicios/apoyos.service';
import { S_extras } from 'src/app/servicios/extras.service';
import { S_cadidatos } from 'src/app/servicios/cadidatos.service';

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

    estado:"",
    municipio:"",

    colonia:"ermita",
    calle:"eros",
    entre_calles:"eros",
    no_int:1,
    no_ext:"2011",
    
    fotografia:"string",
    latitud:1,
    longitud:1,

    pregunta1 : 1,
    pregunta2 : 'Casa Propia',
    pregunta3 : '1',
    pregunta4 : '1',
    pregunta5 : '1',
    pregunta6 : '1',
    pregunta7 : '1',
    pregunta8 : 'Si',
    pregunta9 : 'Si',
    pregunta10:{
      a1:'Si',
      a2:'Si',
      a3:'Si',
      a4:'Si',
      a5:'Si',
      a6:'Si',
      a7:'Si',
      a8:'Si',
      a9:'Si'
    }
  }
  hay_ubucacion = false;
  apoyos_lista: string[] = [];
  apoyos_estatus: string[] = [];

  estado_lista: string[] = [];
  municipio_lista: string[] = [];

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  imageUrl: string = '';
  selectedFile!: File ;


  showMenu = false;
  toggleMenu() {this.showMenu = !this.showMenu;}

  constructor(
    private API_apoyo: S_apoyos,
    private API_extras: S_extras,
    private API_candidato: S_cadidatos
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
      this.candidato.id_tipo_apoyo = 1;
    });
    this.API_apoyo.getApoyosStatus().subscribe((r)=>{
      this.apoyos_estatus = r.apoyo_estatus;
      this.candidato.id_estatus = 1;
    });
  }

  onSubmit(form: NgForm){

    if(form.valid == true){
      if (this.imageUrl != '') {

        if (this.hay_ubucacion == true) {
          // console.log('Formulario enviado:', form.value);
          // console.log(this.candidato);
          
          
          // console.log(this.selectedFile);
          
          var formData = new FormData();
          if (this.selectedFile) {
            formData.append('archivo', this.selectedFile);

            formData.forEach((value, key) => {
              console.log(`Key: ${key}, Value: ${value}`);
            });
            console.log(formData);
          }
          
          
          // this.API_candidato.UpdateCandidato(this.candidato, 1).subscribe(()=>{});
        }else{
          alert('VERIFIQUE SU UBICACION EN EL MAPA');
        }

      }else{
        alert('Falta una foto');  
      }
    }else{
      alert('Faltan datos');
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
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
}
