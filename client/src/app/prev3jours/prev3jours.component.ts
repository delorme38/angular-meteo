import { Component, Input, OnInit } from '@angular/core';
import { WttrObject, Weather } from '../../../../common/weather';
@Component({
  selector: 'app-prev3jours',
  templateUrl: './prev3jours.component.html',
  styleUrls: ['./prev3jours.component.css']
})
export class Prev3joursComponent implements OnInit {

  constructor() { }
  
  @Input() public data: WttrObject[] = [];

  ngOnInit(): void {

  }

}
