import { Commentaire } from './commentaire.model';

export class Campagne {
    campagneId!: number;
    image!: string;
    nom!: string;
    description!: string;
    Campdate!: Date; //publishDate
    objectifCollecte!: number;
    montantCollecte!: number;
    statut!: 'actif' | 'suspendu'; 
    UserId!: number; 
    commentaires: Commentaire[] = []; 
}