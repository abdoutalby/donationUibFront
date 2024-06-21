import { User } from './user.model';
import { Don } from './don.model'; 
import { Commentaire } from './commentaire.model'; 

export class Donneur extends User {
  avatar!: string; // Photo
  client!: boolean;
  nom!: string;
  prénom!: string;
  dateDeNaissance!: Date;
  pays!: string;
  dons: Don[] = []; // List of donations
  commentaires: Commentaire[] = []; // List of comments
}
