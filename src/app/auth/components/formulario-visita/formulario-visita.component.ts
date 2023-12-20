import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { R_usuarios } from 'src/app/interfaces/usuarios';
import { S_auth } from 'src/app/servicios/auth.service';
import { S_cadidatos } from 'src/app/servicios/cadidatos.service';

@Component({
  selector: 'app-formulario-visita',
  templateUrl: './formulario-visita.component.html',
  styleUrls: ['./formulario-visita.component.css']
})
export class FormularioVisitaComponent {
  selectedVisitado: string = '';
  selectedEncuesta: string = '';
  razon: string = '';
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

  constructor(
    private dialog: MatDialog,
    public authService: S_auth,
    private router: Router,
    private candidatosService: S_cadidatos
  ){}


  ngOnInit(): void {
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

  @ViewChild('inputRazon') inputRazon: any;

  ssaveInfo(formulario: NgForm): void {
    console.log('Visitado:', this.selectedVisitado);
    console.log('Estatus encuesta:', this.selectedEncuesta);
    console.log('Razón:', this.inputRazon.nativeElement.value);
    this.inputRazon.nativeElement.value = '';
    this.selectedVisitado = '';
    this.selectedEncuesta = '';
    formulario.resetForm();
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     data: {
  //       visitado: this.selectedVisitado,
  //       estatusEncuesta: this.selectedEncuesta,
  //       razon: this.inputRazon.nativeElement.value,
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('Dialogo cerrado', result);
  //   });
  // }
}

