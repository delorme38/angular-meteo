import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WttrObject, Weather } from '../../../../common/weather';
import { Head, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  constructor(private _weatherService: WeatherService) { }

  @Input() public data: WttrObject[] = [];
  public villes: string[] = [environment.defaultLocation];

  ngOnInit(): void {
    this._weatherService.data.subscribe({
      next: a => {
        this.data = a
      }
    })
  }

  retourneMeteo(locations: string): void {
    this._weatherService.getWeathers(locations)
      .subscribe({
        next: d => { this.data = d },
        error: err => console.error(err)
      });
    console.log(this.data);
  }
}
