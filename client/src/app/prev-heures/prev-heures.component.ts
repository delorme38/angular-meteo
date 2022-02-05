import { Component, Input, OnInit } from '@angular/core';
import { WttrObject } from '../../../../common/weather';

@Component({
  selector: 'app-prev-heures',
  templateUrl: './prev-heures.component.html',
  styleUrls: ['./prev-heures.component.css']
})
export class PrevHeuresComponent implements OnInit {

  constructor() { }

  @Input() public data: WttrObject[] = [];

  ngOnInit(): void {
    
  }

}
