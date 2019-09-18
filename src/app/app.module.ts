import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CalificacionesComponent } from './component/calificaciones/calificaciones.component';
import { MatRippleModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CalificacionesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    MatRippleModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
