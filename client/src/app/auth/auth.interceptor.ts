import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { exhaustMap, last, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

/*
* Cette classe permet d'ajouter le jwt aux requête http
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this._authService.user) {
      //L'utilisateur n'est pas connecté
      return next.handle(request);
    }

    return this._authService.user.pipe(take(1), exhaustMap(user => {
      if(!user?.token){
        //L'utilisateur n'est pas connecté
        return next.handle(request);
      }

      //On fait l'ajout du token pour chaque requête HTTP
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer'
      });
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return next.handle(authRequest);
    }))
  }
}
