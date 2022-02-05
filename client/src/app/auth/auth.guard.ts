import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';


/*
* Cette classe permet de bloquer les routes en fonction de l'authentification
*/
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _authService: AuthService, private _router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Return true si les informations de l'utilisateur existe
      //Si elle n'existe pas on dirige l'utilisateur vers /auth
      return this._authService.user.pipe(map(u => {
        return !!u?.token ? true : this._router.createUrlTree(['/auth']);
      }));
  }
  
}
