import { Component, OnInit , ElementRef, ViewChild, Input,AfterViewInit} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
// import { S_heremaps } from 'src/app/servicios/here_maps.service';

import { I_agregarCandidato, I_visita } from 'src/app/interfaces/candidatos';
import { S_apoyos } from 'src/app/servicios/apoyos.service';
import { S_extras } from 'src/app/servicios/extras.service';
import { S_cadidatos } from 'src/app/servicios/cadidatos.service';

import * as mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiZWxqdWFuIiwiYSI6ImNsb3h3OWRrbjE4dW4yaXBrOTQwbnVpcTgifQ.yTolcwsR9FaHdpA-yAmoHQ';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit{
  
  candidato: I_visita = {
    id_visita:1,
    id_candidato:1,
    id_usuario:1,
    razon:'', //": "comosea",
    id_estatus_encuesta:1,
    created_at:'', //": "2023-11-24T10:21:30.242Z",
    updated_at:'', //": "2023-11-26T18:36:13.387Z",

    // ------------------------------------
    // candidato: I_agregarCandidato = {
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
    latitud:0,
    longitud:0,

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
    },

    correo:'',
    password:'',
    id_rol:1,
    token:'',
    estatus:1
  }
  hay_ubucacion = false;
  apoyos_lista: string[] = [];
  apoyos_estatus: string[] = [];

  estado_lista: string[] = [];
  municipio_lista: string[] = [];

  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  imageUrl: string = '';
  selectedFile!: File ;


  showMenu = false;
  toggleMenu() {this.showMenu = !this.showMenu;}

  constructor(
    private API_apoyo: S_apoyos,
    private API_extras: S_extras,
    private API_candidato: S_cadidatos,
    private route: ActivatedRoute,
    private router: Router
    // private hereMapsService: S_heremaps
  ){
    
    
  }
  ngOnInit(){    
    this.API_extras.getEstados().subscribe((r)=>{
      this.estado_lista = r.estados;
      this.candidato.estado = r.estados[0];
    });
    
    this.API_apoyo.getApoyos().subscribe((r)=>{
      this.apoyos_lista = r.apoyo;
      this.candidato.id_tipo_apoyo = 1;
    });
    this.API_apoyo.getApoyosStatus().subscribe((r)=>{
      this.apoyos_estatus = r.apoyo_estatus;
      this.candidato.id_estatus = 1;
    });

    this.route.params.subscribe(params => {
      
      const id = +params['id'];

      if (isNaN(id)) {
        this.router.navigate(['/lista_apoyos']);
      }else{
        this.API_candidato.GetCandidatoVisita(id).subscribe((r)=>{
          this.candidato = r.result[0];
          this.imageUrl = 'https://prototipo2023-d6240700184c.herokuapp.com/api/uploads/visitas/'+this.candidato.id_visita;
          this.valoresPorDefecto();
          this.getMunicipios(this.candidato.estado);
        });
        this.hay_ubucacion = true;
        this.GetMapa();
      }
      

    });
    
  }

  onSubmit(form: NgForm){
    if(form.valid == true){
      if (this.imageUrl != '' ) {

        if (this.hay_ubucacion == true) {
          // console.log('Formulario enviado:', form.value);
          // console.log(this.candidato);
          const nuevos_datos:I_agregarCandidato = {
            nombre:this.candidato.nombre,
            edad:this.candidato.edad,
            estado:this.candidato.estado,
            municipio:this.candidato.municipio,

            colonia:this.candidato.colonia,
            calle:this.candidato.calle,
            entre_calles:this.candidato.entre_calles,
            no_int:''+this.candidato.no_int,
            no_ext:this.candidato.no_ext,

            institucion:this.candidato.institucion,
            grado_escolaridad:this.candidato.grado_escolaridad,
            fotografia:this.candidato.fotografia,
            
            id_tipo_apoyo:this.candidato.id_tipo_apoyo,
            id_estatus:this.candidato.id_estatus,
            latitud:this.candidato.latitud,
            longitud:this.candidato.longitud,

        //  PREGUNTAS ----------------------------------------------------------------
            pregunta1:this.candidato.pregunta1,
            pregunta2:this.candidato.pregunta2,
            pregunta3:this.candidato.pregunta3,
            pregunta4:this.candidato.pregunta4,
            pregunta5:this.candidato.pregunta5,
            pregunta6:this.candidato.pregunta6,
            pregunta7:this.candidato.pregunta7,
            pregunta8:this.candidato.pregunta8,
            pregunta9:this.candidato.pregunta9,
            pregunta10:this.candidato.pregunta10
          }
          var nuevo_id = 0;
          this.API_candidato.UpdateCandidato(nuevos_datos, this.candidato.id_candidato).subscribe((r)=>{
            console.log(r.id);
          });

          // this.API_candidato.updateImage();
          
          var formData = new FormData();
          if (this.selectedFile) {
            formData.append('archivo', this.selectedFile);
            // formData.forEach((value, key) => {console.log(`Key: ${key}, Value: ${value}`);});
            console.log(formData);
          }
          
          
          
        }else{
          alert('VERIFIQUE SU UBICACION EN EL MAPA');
        }

      }else{
        alert('Falta una foto');  
      }
    }else{
      alert('Faltan datos');

      Object.keys(form.controls).forEach(key => {
        const control = form.controls[key];
        if (control.errors) {
          console.log(`- ${key} es un campo requerido.`);
        }
      });
    }
    
  }

  getMunicipios(estado?:string){
    this.API_extras.getMunicipios(estado??this.candidato.estado).subscribe((r)=>{
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

          this.GetMapa();
        });

      // this.hereMapsService.initializeMap(this.mapElement.nativeElement);
    }else{
      alert('Se requieren datos');
    }
    
  }
  GetMapa(){
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [this.candidato.longitud, this.candidato.latitud], // starting position [lng, lat]
      zoom: 32, // starting zoom
    }
  )}

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

  valoresPorDefecto(){
    this.candidato.pregunta10 ={
      a1:'No',
      a2:'No',
      a3:'No',
      a4:'No',
      a5:'No',
      a6:'No',
      a7:'No',
      a8:'No',
      a9:'No'
    }
    this.candidato.pregunta1 = 1;
    this.candidato.pregunta2 ='Casa Propia';
    this.candidato.pregunta3 ='1';
    this.candidato.pregunta4 ='1';
    this.candidato.pregunta5 ='1';
    this.candidato.pregunta6 ='1';
    this.candidato.pregunta7 ='1';
    this.candidato.pregunta8 ='Si';
    this.candidato.pregunta9 ='Si';
  }


  
}
