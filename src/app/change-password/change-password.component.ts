import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  passwordStrengthMessage: string = '';
  passwordStrengthColor: string = '';


  constructor(
    private router : Router,
    private authService : AuthService,
    private userService : UsersService){}

  checkPasswordStrength(): void {

    if (!this.newPassword) {
      this.passwordStrengthMessage = '';
      this.passwordStrengthColor = '';
      return;
    }
  
    // Check for each strength criteria
    const hasLowercase = /[a-z]/.test(this.newPassword);
    const hasNumber = /[0-9]/.test(this.newPassword);
  
    let strength = 0;
    if (hasLowercase) strength++;
    if (hasNumber) strength++;
  
    // Check length
    if (this.newPassword.length > 5) {
      strength++;
    }
  
    // Determine strength message and color based on the number of fulfilled criteria
    if (strength === 3) {
      this.passwordStrengthMessage = 'Strong password';
      this.passwordStrengthColor = 'green';
    } else if (strength === 2) {
      this.passwordStrengthMessage = 'Moderate password';
      this.passwordStrengthColor = 'orange';
    } else {
      this.passwordStrengthMessage = 'Weak password';
      this.passwordStrengthColor = 'red';
    }
  }

  changePassword() {

    if(this.currentPassword.length==0){
      Swal.fire("OOPS !!" ,  "please enter your current password" , 'error')
      return ;
    }
       const body = {
        email : this.authService.getUserId(),
        password : this.newPassword
      }
      this.userService.changePassword(body).subscribe({
        next : (res : any )=> {
          this.router.navigate(['/'])
        },
        error : (err : any )=> {
          console.log(err);
          
        }
      })  
  
  }
}
