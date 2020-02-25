import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import { FormComponent } from './components/form/form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CoordinatesService} from './geolocation/coordinates.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiZGd1dGkwOSIsImEiOiJjazF2ZXM3dDEwM2hkM2RvNDJ3ZjI4dTczIn0._cnc3MhGTEkYI9ty2Vl_Tg'
    }),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CoordinatesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
