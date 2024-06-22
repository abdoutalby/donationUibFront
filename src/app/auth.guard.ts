import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = this.authService.getUserRole(); 

    if (!userRole) {
      console.error('User role not found or not set.');
      this.router.navigate(['/login']); 
      return false;
    }

    const requiredRoles = (route.data as { roles: string[] }).roles;

    if (requiredRoles && requiredRoles.length > 0 && requiredRoles.includes(userRole)) {
      return true; // User has access 
    } else {
        Swal.fire({
            title: 'Accès non autorisé',
            text: 'Vous n\'êtes pas autorisé à accéder à cette page.',
            icon: 'error',
            confirmButtonText: 'OK',
            allowOutsideClick: false
          }).then(() => {
            // Ensure the redirection logic is correctly applied after the user acknowledges the alert
            if (userRole === "donneur") {
              this.router.navigate(['/']);
            } else if (userRole === "donataire") {
              this.router.navigate(['/overview']);
            } else {
              this.router.navigate(['/']);
            }
          });
        }
      return false; // Deny access
    }
  }
