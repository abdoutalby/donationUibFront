import { User } from './user.model';
import { Campagne } from './campagne.model'; 

export class Donataire extends User {
  type!: 'association' | 'entreprise';
  nom!: string;
  pays!: string;
  filiere!: string;
  logo!: string; 
  carteIdentiteFiscale!: string; 
  rib!: string; 
  description!: string;
  campagnes: Campagne[] = []; 
}
