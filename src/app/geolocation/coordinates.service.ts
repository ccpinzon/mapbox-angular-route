import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {RoutingInfo} from './routing-info';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {
  latitudeToMap: number;
  longitudeToMap: number;
  routingInfo: RoutingInfo;
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
  setRoutingInfo(routingInfoAux: RoutingInfo) {
    console.log(`method setRoutingInfo() -> ${JSON.stringify(routingInfoAux)}`)
    this.routingInfo = routingInfoAux;
  }

  callComponentMethod() {
    this.componentMethodCallSource.next();
  }

}
