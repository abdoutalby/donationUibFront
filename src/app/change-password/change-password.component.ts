import { Component } from '@angular/core';

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
    // Implement your change password logic here
    if (this.newPassword !== this.confirmPassword) {
      // Passwords match, proceed with changing password
      const errorMessage = 'Password does not match. Please try again. ';
      this.errorMessage = errorMessage; 
      // Add your logic to call the API or service to change the password
    } 
  }
}
