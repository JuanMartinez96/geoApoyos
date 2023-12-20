import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    public authService: S_auth,
    private router: Router,
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
}
