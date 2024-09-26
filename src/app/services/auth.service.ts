import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "http://localhost:8090/auth/"


  constructor(private http: HttpClient) {
  }


  login(login: any) {
    return this.http.post(this.url + "login", login)
  }

  register(register: any) {
    return this.http.post(this.url + "register", register)
  }
  forgetPassword(body: { email: any; }) {
    return this.http.post(this.url + "forgetPassword", body)
  }

  getToken() {
    var token = localStorage.getItem("token");
    return token
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  getUserId(){
    if (this.isAuthenticated()) {
      const token = localStorage.getItem("token");
      var decoded = jwtDecode(token!);
      var json: any = decoded;
      return json.userId;
    }
  }

  getUserRole(): string {
    if (this.isAuthenticated()) {
      const token = localStorage.getItem("token");
      var decoded = jwtDecode(token!);
      var json: any = decoded;
      return json.role.authority
    }
    return "VISITER";
  }



}
