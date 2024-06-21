export class User {
  UserId!: number;
  role!: 'donneur' | 'Donataire' | 'admin';
  adresseEmail!: string;
  motDePasse!: string;
}
