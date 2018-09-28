import { Component, OnInit, Input } from '@angular/core';
import { SearchModel } from '../../models/search.model';
import {Flight} from '../../models/flight.model';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent implements OnInit {

 
  constructor() {
  }

  @Input() returnResult;
  @Input() oneWayResult;
  @Input() notifyMessage;
  @Input() retOneWayResult;
  @Input() depOneWayResult;
  @Input() travellers;
  @Input() maxPrice;
  
  ngOnInit() {
  
  }


}
