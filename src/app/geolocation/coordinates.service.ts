import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {
  latitudeToMap: number;
  longitudeToMap: number;

  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  constructor() { }

  setNewCoordinatesMap(lat: number, lon: number ) {
    if (lat && lon) {
      this.latitudeToMap = lat;
      this.longitudeToMap = lon;
      console.log(`Nuevas Cordenadas -> ${this.latitudeToMap} , ${this.longitudeToMap} `);
    }
  }

  callComponentMethod() {
    this.componentMethodCallSource.next();
  }

}
