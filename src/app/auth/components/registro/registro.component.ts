import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  showMenu = false;

  menuItems = [
    { label: 'Registro de\nCandidatos', link: '/registro', backgroundColor: '#00548F', icon: '/assets/libro.png' },
    { label: 'Estatus de\nVisita', link: '/visitas', backgroundColor: '#606060', icon: '/assets/camion.png' },
    { label: 'Permisos de\nUsuario', link: '/permisos', backgroundColor: '#F28629', icon: '/assets/contacto.png' }
  ];

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }


}
