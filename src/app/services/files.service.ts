import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  url = "http://localhost:8080/api/files/"

  constructor(private http: HttpClient) { }

  upload(file : any ){
    return this.http.post(this.url +"upload" , file )
  }

  

}
