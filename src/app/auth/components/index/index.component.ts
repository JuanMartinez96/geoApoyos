import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'index-component',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  constructor(
    private router: Router
  ){}

   //funcion que direcciona a la pagina de login
   redirectLogin(){
    this.router.navigate(['/login'])
  }

}
