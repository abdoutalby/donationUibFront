import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {
  
  

  url = "http://localhost:8080/api/campagne/" ;
  constructor(private http : HttpClient) { }

  charge(body: any ) {
    return this.http.post("http://localhost:8080/charge" , body)
  }
  getRelatedProject(project: any) {
    return this.http.get(this.url +"related/"+project)
  }
 getTotal() {
   return this.http.get(this.url+"count")
 }
 getAllByUserId(id : any ) {
   return this.http.get(this.url +"findAllByUserId/"+id)
  }
 

  getAlmostFinished() {
    return this.http.get(this.url +"almostFinished")
   }


  getAll(){
    return this.http.get(this.url +"findAll")
  }

  getById(id : any ){
    return this.http.get(this.url +"findById/"+id)
  }

  save(campagne : any ){
    return this.http.post(this.url+"save" , campagne)
  }
  update(campaign: any) {
    return this.http.patch(this.url +"update/"+campaign.id , campaign)
  }

}
