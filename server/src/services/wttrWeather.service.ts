// eslint-disable-next-line @typescript-eslint/no-var-requires
import { WeatherProvider } from '../interfaces';
import { injectable } from 'inversify';
import { Response } from 'node-fetch';
import fetch from 'node-fetch';

const base = 'https://wttr.in/';

@injectable()
/*
* Cette classe fait la communication avec l'API de wttr
*/
export class wttrWeatherService implements WeatherProvider{
    constructor(){
        //empty
    }

    //Retourne la météo pour plusieurs villes
    async readWeathers(locations: string[]): Promise<JSON[]> {
        const weathers: JSON[] = [];
        for(const location of locations){
            weathers.push(await this.readWeather(location));
        }
        return weathers;
    }
    
    //Retourne la météo pour une ville
    async readWeather(location: string): Promise<JSON> {
        const response: any = await (await fetch(`${base}/${location}?format=j1&lang=fr`)).json();
        response.ville = location;  //j'ai mit un type any au lieu de Response parceque je n'arrive pas a manipuler mon json sinon
        return response;
    }

}