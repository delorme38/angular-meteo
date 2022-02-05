import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WttrObject } from '../../../common/weather';


/*
* Service pour les opérations en lien avec la météo
*/
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _httpClientModule: HttpClient) {
  }
  
  //Permet de retourner le sujet et de d'initialiser
  //le sujet à la ville par défaut si c'est la première requête
  //vous pouvez vous abonnez à data pour obtenir les données météos
  get data(): BehaviorSubject<WttrObject[]>{
    if(!this._data){
      this._data = new BehaviorSubject<WttrObject[]>([]);
      this.getWeathers().subscribe({
        error:err => console.error(err)
      });
    }
    return this._data;
  }

  //Conserve le sujet
  private _data?: BehaviorSubject<WttrObject[]>;
  
  //Lance une recherche météo pour une série de ville
  getWeathers(locations: string = environment.defaultLocation): Observable<WttrObject[]> {
    return this._httpClientModule.get<WttrObject[]>(`${environment.apiBaseUrl}/weather?locations=${locations}`)
    //On envoie également l'information dans le behaviorSubject
    //un component va pouvoir s'abonner et reçevoir l'information
    .pipe(tap(data => this.data.next(data)));
  }
}
