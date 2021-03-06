import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable()

export class AppService {
    constructor( private http : HttpClient){} 

    public searchFlights(data): Observable<any> {
        let queryParams = `?fromCity=${data.fromCity}&toCity=${data.toCity}&departureDate=${data.departureDate}&travellers=${data.travellers}`;
        if(data.returnDate){
            queryParams = `${queryParams}&returnDate=${data.returnDate}`;
        }
        return this.http.get(`/api/v1/search-results${queryParams}`);
    }

}