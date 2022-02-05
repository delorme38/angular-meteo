import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Authentification } from '../../../../common/authentification';
import { UserDTO } from '../../../../common/user';

/*
* Service pour la gestion de l'authentification
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient, private _router: Router) { }
  
  //Contient les informations de l'utilisateur actif
  public user: BehaviorSubject<UserDTO> = new BehaviorSubject({username:''});
  
  //Permet à l'utilisateur de se connecter
  login(auth: Authentification): Observable<UserDTO>{
    return this._httpClient.post<UserDTO>(`${environment.apiBaseUrl}/auth/login`,auth)
    //On envoie l'utilisateur à tous les
    //aboonées du sujet user
    .pipe(tap(user => {
      this.user.next(user)
      //On dirige l'utilisateur vers /weather
      this._router.navigate(['weather'])
    }));
  }
  
  //Permet à l'utilisateur de créer un compte
  signup(auth: Authentification): Observable<UserDTO>{
    return this._httpClient.post<UserDTO>(`${environment.apiBaseUrl}/auth/signup`,auth)
    //On envoie l'utilisateur à tous les
    //aboonées du sujet user
    .pipe(tap(user => {
      this.user.next(user)
      //On dirige l'utilisateur vers /weather
      this._router.navigate(['weather'])
    }));
  }
  
  //Permet à l'utilisateur de se déconnecter
  logout():void{
    this.user.next({username:''});
    this._router.navigate(['auth']);
  }
}
