import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated(): boolean {
    //Check if the user's authentication token is present in local storage or cookies
    //const token = localStorage.getItem('token');
    //return token !== null;
    return true;
  }


  getUserRole(): string {
    //return localStorage.getItem('userRole') || ''; // Return user role from localStorage
    return 'donneur'; // donneur - donataire - vide pour visiteur - admin
  }
}
