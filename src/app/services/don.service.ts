import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonService {
  


  url = "http://localhost:8090/api/dons/"
  constructor(private http : HttpClient) { }

  
  getAll() {
    return this.http.get(this.url+"getAll")
  }
  
  getLastThree() {
    return this.http.get(this.url+"getLastThree")
  }
  getAllByUser(arg0: number) {
    return this.http.get(this.url+"getAllUserDons/1")
  }
  

  getTotal() {
    return this.http.get(this.url+"total/1");
   }
}
