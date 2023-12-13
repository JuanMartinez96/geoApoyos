import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent {

  showMenu = false;

  menuItems = [
    { label: 'Registro de\nCandidatos', link: '/registro', backgroundColor: '#00548F', icon: '/assets/libro.png' },
    { label: 'Estatus de\nVisita', link: '/estatus', backgroundColor: '#606060', icon: '/assets/camion.png' },
    { label: 'Permisos de\nUsuario', link: '/permisos', backgroundColor: '#F28629', icon: '/assets/contacto.png' }
  ];

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  

}
