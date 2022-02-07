import { Component, Input, OnInit } from '@angular/core';
import { WttrObject } from '../../../../common/weather';
import { WeatherService } from '../weather.service';
import { MeteoComponent } from '../meteo/meteo.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _weatherService: WeatherService, private meteo: MeteoComponent) { }

  @Input() public recherche: string = '';
  public villes?: string[];

  ngOnInit(): void {
  }

  getWeathers(): void {
    console.log('Header getWeathers() function:', this.recherche);
    this._weatherService.getWeathers(this.recherche).subscribe({
      next: data => {
        this.meteo.data = data;
        console.log(data);
        this.villes = this.recherche.split(',');
        this.meteo.villes = this.villes;
        console.log(this.villes);
      },
      error: err => console.log(err)
    });
  }
}
