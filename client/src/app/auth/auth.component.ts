import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

/*
* Component pour faire l'authentification de vos utilisateurs
* Ce component sera affiché lorsque l'utilisateur n'est pas connecté
*/
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  
  //Bouton login
  login(form: NgForm){
    this._authService.login(form.value).subscribe({
      error:err => alert('Erreur lors de la connexion')
    })
  }
  
  //Bouton signup
  signup(form: NgForm){
    this._authService.signup(form.value).subscribe({
      error: err => alert("Erreur lors de l'inscription") 
    })
  }

}
