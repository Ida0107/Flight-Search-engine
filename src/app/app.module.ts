import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponentComponent } from './search-component/search-component.component';
import { FormsModule } from '../../node_modules/@angular/forms'; 
import { MatSliderModule } from '@angular/material/slider';
import { AppService } from './app.service';
import { DisplayResultComponent } from './search-component/display-result/display-result.component';




@NgModule({
  declarations: [
    AppComponent,
    SearchComponentComponent,
    DisplayResultComponent,
  ],
  imports: [
    BrowserModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    MatSliderModule,
    HttpClientModule,
 
  ],
  providers: [AppService],

  bootstrap: [AppComponent]
})
export class AppModule { }
