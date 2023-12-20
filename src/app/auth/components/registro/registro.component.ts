import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { I_agregarCandidato } from 'src/app/interfaces/candidatos';
import { S_apoyos } from 'src/app/servicios/apoyos.service';
import { S_cadidatos } from 'src/app/servicios/cadidatos.service';
import { S_extras } from 'src/app/servicios/extras.service';

import { R_usuarios } from 'src/app/interfaces/usuarios';
import { S_auth } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  showMenu = false;
  loggedInUser: R_usuarios | null = null;

  menuItems = [
    { label: 'Registro de\nCandidatos', link: '/registro', backgroundColor: '#00548F', icon: '/assets/libro.png' },
    { label: 'Estatus de\nVisita', link: '/visitas', backgroundColor: '#606060', icon: '/assets/camion.png' },
    { label: 'Permisos de\nUsuario', link: '/permisos', backgroundColor: '#F28629', icon: '/assets/contacto.png' }
  ];

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  // ----------------------------------------------
  estado_lista: string[] = [];
  municipio_lista: string[] = [];

  apoyos_lista: string[] = [];
  apoyos_estatus: string[] = [];

  imageUrl: string = '';
  selectedFile!: File ;
  mensaje : string= '';
  formulario={
    nombre:"",
    edad:0,

    estado:"",
    municipio:"",
    colonia:"",
    calle:"",
    entre_calles:"",
    no_int: '',
    no_ext:"",

    institucion:"",
    grado_escolaridad:"Secundaria",
    id_tipo_apoyo:1,
    id_estatus:1,

    latitud:0,
    longitud:0,
    fotografia:"",

    pregunta1 :0,
    pregunta2 :'',
    pregunta3 :'',
    pregunta4 :'',
    pregunta5 :'',
    pregunta6 :'',
    pregunta7 :'',
    pregunta8 :'',
    pregunta9 :'',
    pregunta10 :{
      a1:'no',
      a2:'no',
      a3:'no',

      a4:'no',
      a5:'no',
      a6:'no',

      a7:'no',
      a8:'no',
      a9:'no'
    }
  }

  constructor(
    private API_extras: S_extras,
    private API_apoyo: S_apoyos,
    private API_candidato:S_cadidatos,
    private router: Router,
    public authService: S_auth
  ){}

  ngOnInit(){
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


    this.API_extras.getEstados().subscribe((r)=>{
      this.estado_lista = r.estados;
      this.formulario.estado = r.estados[0];
      this.getMunicipios(r.estados[0]);
    });

    this.API_apoyo.getApoyos().subscribe((r)=>{
      this.apoyos_lista = r.apoyo;
      this.formulario.id_tipo_apoyo = 1;
    });
    this.API_apoyo.getApoyosStatus().subscribe((r)=>{
      this.apoyos_estatus = r.apoyo_estatus;
      this.formulario.id_estatus = 1;
    });
  }

  getMunicipios(estado?:string){
    this.API_extras.getMunicipios(estado??this.formulario.estado).subscribe((r)=>{
      this.municipio_lista = r.municipios;
      this.formulario.municipio = r.municipios[0];
    });
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

  onSubmit(form: NgForm){
    if(form.valid == true && this.imageUrl != ''){
      // console.log(this.formulario);
      
      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });
      
      this.API_candidato.InsertCandidatos(this.formulario).subscribe((r)=>{
        console.log(r);
        var formData = new FormData();
        formData.append('archivo', this.selectedFile);

        this.API_candidato.updateImage(formData,r.id_candidato,'candidatos').subscribe((rr)=>{
          console.log(rr);
        });
      });

      this.router.navigate(['/']);
    }else{
      this.mensaje = 'Faltan datos por validar'
    }
  }


  logout() {
    const userId = 3;

    this.authService.logout(userId).subscribe(
      (response) => {
        console.log('Logout exitoso:', response);
        this.router.navigate(['/login']);
      },
    );
  }
}
