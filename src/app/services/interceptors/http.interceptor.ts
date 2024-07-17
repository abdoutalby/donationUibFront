import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
     const authToken ="Bearer "+ this.auth.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization',  authToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}