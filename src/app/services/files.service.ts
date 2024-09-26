import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  url = "http://localhost:8090/api/files/"

  constructor(private http: HttpClient) { }

  upload(file : any ){
    return this.http.post(this.url +"upload" , file )
  }

  load(file : any ){
    return this.http.get(this.url+"load/"+file);
  }
  

}
