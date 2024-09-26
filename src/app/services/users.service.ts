import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 
  
  

  url = "http://localhost:8090/api/users/"
  constructor(private http : HttpClient) { }

  
 
  changePassword(body: any) {
    return this.http.put(this.url +"changePassword" , body)
  }
  update(donataire: any) { 
    return this.http.post(this.url + "update/"+donataire.id, donataire)
   }

  getAllAdmins() {
    return this.http.get(this.url+"totalAdmins");
   }
    
   getUserById(id : any ){
    return this.http.get(this.url +id)
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