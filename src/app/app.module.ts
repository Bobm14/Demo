import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CalificacionesComponent } from './component/calificaciones/calificaciones.component';
import { MatRippleModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    CalificacionesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    MatRippleModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
