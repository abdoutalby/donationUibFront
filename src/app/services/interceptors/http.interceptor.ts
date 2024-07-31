import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = "Bearer " + this.auth.getToken();
    if (req.url.includes("/auth/") ||
      req.url.includes("/files/")) {
         
      return next.handle(req)
    }
     
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    return next.handle(authReq)
  }
}