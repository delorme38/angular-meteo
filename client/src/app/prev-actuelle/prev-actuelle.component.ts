import { Component, Input, OnInit } from '@angular/core';
import { WttrObject } from '../../../../common/weather';

@Component({
  selector: 'app-prev-actuelle',
  templateUrl: './prev-actuelle.component.html',
  styleUrls: ['./prev-actuelle.component.css']
})
export class PrevActuelleComponent implements OnInit {

  constructor() { }

  @Input() data: WttrObject[] = [];
  @Input() villes: string[] = [];

  ngOnInit(): void {
  }

}
