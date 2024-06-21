import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
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
      if (result.value) {
        // Send email to reset password
        Swal.fire('Email envoyé!', 'Un email vous a été envoyé pour réinitialiser votre mot de passe.', 'success');
      } else {
        Swal.fire('Erreur', 'Veuillez entrer votre adresse email.', 'error');
      }
    });
  }

  onSubmit(): void {
    // Login logic here
  }
}