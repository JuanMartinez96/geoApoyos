import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router
  ){}

   //funcion que direcciona a la pagina de login
   redirectPrincipal(){
    this.router.navigate(['/principal'])
  }

}
