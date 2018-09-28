import { Component, OnInit, Renderer } from '@angular/core';
import { AppService } from '../app.service';
import { SearchModel } from '../models/search.model';
import { Flight } from '../models/flight.model';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  constructor(private service : AppService) {
    if(!this.returnResult){
      this.returnResult = [new SearchModel];
    }
    if(!this.departureFlights){
      this.departureFlights = [new Flight];
    }
    if(!this.returnFlights){
      this.returnFlights = [new Flight];
    }

  }

  formData : any ={};
  formError : string;
  isSelected = true;
  departureFlights : [Flight];
  returnFlights : [Flight];
  toRender = false;
  slider = false;
  today=new Date();
  returnResult :Array<SearchModel>;
  oneWayResult : [Flight];
  notifyMessage : string;
  retOneWayResult : [Flight];
  depOneWayResult : [Flight];
  resultBackUp;
  
  ngOnInit() {
  }

  private ifReturnDate(){
    this.oneWayResult = null;
    if(!this.departureFlights[0].error && !this.returnFlights[0].error){
      this.returnResult = this.showReturnCombo(this.departureFlights, this.returnFlights);
      this.resultBackUp = this.returnResult;
    }
    else if(this.departureFlights[0].error && !this.returnFlights[0].error){
      this.retOneWayResult = this.retOneWayResult_func();
      this.resultBackUp = this.retOneWayResult;
    }
    else if(!this.departureFlights[0].error && this.returnFlights[0].error){
      this.depOneWayResult = this.depOneWayResult_func();
      this.resultBackUp = this.depOneWayResult;
    }
    else{
      this.notifyMessage = this.showNotifyMessage();
    }
  }

  private ifNOReturnDate(){
    this.returnResult = this.retOneWayResult = this.depOneWayResult  = null;
    if(!this.departureFlights[0].error){
      this.oneWayResult = this.departureFlights;
      this.resultBackUp = this.oneWayResult;
      this.slider = true;
    }
    else {
      this.notifyMessage = this.showNotifyMessage();
    } 
  }

  private showReturnCombo( dep : Array<Flight> , ret : Array<Flight>) : Array<SearchModel>{
    this.retOneWayResult = this.depOneWayResult = this.notifyMessage = null;
    this.slider = true;
    var returnCombo = [];
      for(let i = 0; i< dep.length ; i++){
        for(let j = 0; j< ret.length ; j++){
          let combo : SearchModel = {
                      "dep_id" : dep[i].flightCode,
                      "ret_id" : ret[j].flightCode,
                      "fromCity" : dep[i].fromCity,
                      "toCity" : dep[i].toCity,
                      "totalPrice" : (dep[i].price + ret[j].price),
                      "depTime_D" : dep[i].departureTime,
                      "arrTime_D" : dep[i].arrivalTime,
                      "depTime_R" : ret[j].departureTime,
                      "arrTime_R" : ret[j].arrivalTime, 
                      };
          returnCombo.push(combo);
        }
      }
      return returnCombo;  
  }

  private retOneWayResult_func(){
    this.returnResult =  this.depOneWayResult = this.notifyMessage = null;
    this.slider = true; 
    return this.returnFlights;
  }

  private depOneWayResult_func(){
    this.returnResult = this.retOneWayResult = this.notifyMessage = null;
    this.slider = true;
    return this.departureFlights;
  }

  private showNotifyMessage(){
    this.returnResult = this.depOneWayResult = this.retOneWayResult = this.oneWayResult= null;
    this.slider = false;
    return "Flight not found for selected dates";
  }
  
  oneWayActive(){
    this.isSelected = true;
    this.formData.returnDate = null ;
  }

  onChange(){
    this.formData.returnDate = null ;
  }

  roundActive(){
    this.isSelected = false;
    this.formData.departureDate = null;
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  showFlights(){
    if(this.formData.fromCity === this.formData.toCity){
      this.formError = "Departure and Arrival City can't be same";
    }else{
      this.toRender = true;
      this.formError = null;
      this.service.searchFlights(this.formData).subscribe(
      (response)=>{
        this.departureFlights = response.departureFlights;
        this.returnFlights = response.returnFlights;
        if( this.formData.returnDate ){ this.ifReturnDate();}
        else{ this.ifNOReturnDate(); }
      },
      (error)=>{
        this.toRender = false;
        console.log(error);
        });
      } 
  }
  filterByPrice(){
    if(this.returnResult){
      this.filterHelper( "totalPrice" , "returnResult");
    }
    else if(this.oneWayResult) {
      this.filterHelper("price", "oneWayResult");
    }
    else if(this.depOneWayResult){
      this.filterHelper("price", "depOneWayResult");
    }
    else if(this.retOneWayResult){
      this.filterHelper("price", "retOneWayResult");
    }
  }

  private filterHelper( priceProperty : string , resultProperty : string){
    let result = this.resultBackUp.filter(cur => cur[priceProperty] <= this.formData.maxPrice);
    if(result.length==0){
      this.notifyMessage = this.showNotifyMessage()
    }
    else{
      this[resultProperty] = result;
    }
  }

  
}
