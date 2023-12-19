import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { S_auth } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/rememberme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  rememberMe: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authservice: S_auth,
    private storageService: StorageService
  ){}

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    remember: [false]
  });

  ngOnInit(): void {
    const savedEmail = this.storageService.getItem('rememberedEmail');
    const savedPassword = this.storageService.getItem('rememberedPassword');

    if (savedEmail && savedPassword) {
      this.myForm.patchValue({
        email: savedEmail,
        password: savedPassword,
        remember: true,
      });
    }
  }



  redirectPrincipal() {
    const emailControl = this.myForm.get('email');
    const passwordControl = this.myForm.get('password');

    if (emailControl && passwordControl && this.myForm.valid) {
      const loginData = {
        correo: emailControl.value,
        password: passwordControl.value
      };

      this.authservice.login(loginData).subscribe(
        (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/principal']);
        },
        (error) => {
          // Manejar el error del servicio
          console.error('Error en el login:', error);
        }
      );
    } else {
      // Form is invalid, highlight errors or show a message
      console.log('Form is invalid');
    }
  }
}
