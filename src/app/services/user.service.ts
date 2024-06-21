import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Donneur } from '../models/donneur.model';
import { Donataire } from '../models/donataire.model';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private users: User[] = [
        // Example users for testing
        { id: 1, role: 'donneur', client: true, nom: 'Doe', prénom: 'John', dateDeNaissance: new Date('1990-01-01'), pays: 'France', adresseEmail: 'john.doe@example.com', motDePasse: 'password' } as Donneur,
        { id: 2, role: 'Donataire', type: 'association', nom: 'Helping Hands', pays: 'France', filiere: 'Healthcare', logo: 'logo-url', carteIdentiteFiscale: 'fiscale-id-url', rib: 'rib-url', description: 'Non-profit organization', adresseEmail: 'donateur@example.com', motDePasse: 'donateurpassword' } as Donataire,
        { id: 3, role: 'admin', adresseEmail: 'admin@example.com', motDePasse: 'adminpassword' } as Admin,
      ];
    
      getUserProfile(userId: number): Observable<User | undefined> {
        const user = this.users.find(u => u.id === userId);
        return of(user); // This might return undefined if user is not found
      }
    
      updateUserProfile(user: User): Observable<User> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index] = user;
        }
        return of(user);
      }
    }