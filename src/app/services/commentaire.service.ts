import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
 

  url = "http://localhost:8080/api/commentaires/"

  constructor(private http : HttpClient) { }


  save(comment : any ){
    return this.http.post(this.url +"save" , comment);
  }

  getAllByCampagne(id : any ){
    return this.http.get(this.url+"findAllByCampagne/"+id);
  }


  getLatestComments() {
    return this.http.get(this.url+"latest");
  }


  getById(id : any ){
    return this.http.get(this.url+"findById/"+id)
  }


}
