import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  

  url = "http://localhost:8080/api/users/"
  constructor(private http : HttpClient) { }


  
  getAllAdmins() {
    return this.http.get(this.url+"totalAdmins");
   }
    

   getAllDonataires() {
    return this.http.get(this.url+"totalDonataires");
   }
    
   getAllDonneurs() {
    return this.http.get(this.url+"totalDonneurs");
   }
    
  getTotalDonneur() {
    return this.http.get(this.url+"countDonneur");
   }


  getTotalDonatiare() {
    return this.http.get(this.url+"countDonatiare");
   }
}