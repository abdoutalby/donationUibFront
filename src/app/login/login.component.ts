import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService : AuthService , 
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
  }

  login(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next : (res : any )=> {
        console.log(res);
        localStorage.setItem("token", res.token)
        var role = this.authService.getUserRole()
        switch(role){
          case 'GIVER' : this.router.navigate(['/'])
        }
        this.router.navigate(['/annonces'])        
      },
      error : (err : any )=> {
        Swal.fire(err.error.error , "please check your credentails and account state" , 'error')
      }
    })
  }
  forgotPassword(): void {
    Swal.fire({
      title: 'Mot de passe oublié?',
      input: 'email',
      inputPlaceholder: 'Adresse email',
      showCancelButton: true,
      confirmButtonText: 'Envoyer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        var body = {
          "email" : result.value
        }
        this.authService.forgetPassword(body).subscribe({
          next : (res : any )=> {
        Swal.fire('Email envoyé!', 'Un email vous a été envoyé pour réinitialiser votre mot de passe.', 'success');
          }
        })
         } else {
        Swal.fire('Erreur', 'Veuillez entrer votre adresse email.', 'error');
      }
    });
  }

  onSubmit(): void {
    // Login logic here
  }
}