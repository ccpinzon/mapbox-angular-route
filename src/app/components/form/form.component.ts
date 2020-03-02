import { Component, OnInit } from '@angular/core';
import {TollApiService} from '../../geolocation/toll-api.service';
import {Place} from '../../geolocation/place';
import {CoordinatesService} from '../../geolocation/coordinates.service';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {RoutingInfo} from '../../geolocation/routing-info';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
              private tollApiService: TollApiService,
              private coordinatesService: CoordinatesService,
              private configTypeHead: NgbTypeaheadConfig) {
    configTypeHead.showHint = true;
  }

  placesOrigin: Place[]  = [];
  placesDestiny: Place[]  = [];
  modelPlaceOrigin: string;
  modelPlaceDestiny: string;
  hasPlacesOrigin: boolean;
  hasPlacesDestiny: boolean;
  latOrigin: number;
  lonOrigin: number;
  latDestiny: number;
  lonDestiny: number;
  ngOnInit(): void {
  }
  /*searchCity() {
    console.log('method searchCity() ');
    if (this.taskForm.controls.searchTextForm.value) {
      const texto = this.taskForm.controls.searchTextForm.value;
      console.log(texto);
      this.tollApiService.getToll(texto).subscribe( (data: []) => {
        this.places = data;
        console.log(`place -> ${JSON.stringify(this.places)}`);
        const placeAux: Place = this.places[0];
        this.coordinatesService.setNewCoordinatesMap(placeAux.latitude, placeAux.longitude);
        this.coordinatesService.callComponentMethod();
      } );
    }
  }*/


  setCoordinatesToOrigin(place: Place) {
    if (place.latitude && place.longitude) {
      console.log(`origin -> (${place.longitude} , ${place.latitude})`);
      this.latOrigin = place.latitude;
      this.lonOrigin = place.longitude;
      this.modelPlaceOrigin = place.name;
      this.hasPlacesOrigin = false;
    }
  }
  setCoordinatesToDestiny(place: Place) {
    if (place.latitude && place.longitude) {
      console.log(`destiny ->  (${place.longitude} , ${place.latitude})`);
      this.latDestiny = place.latitude;
      this.lonDestiny = place.longitude;
      this.modelPlaceDestiny = place.name;
      this.hasPlacesDestiny = false;
    }
  }
  calcRoute() {
    const routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.latitudeOrigin = this.latOrigin;
    routingInfo.longitudeOrigin = this.lonOrigin;
    routingInfo.latitudeDestiny = this.latDestiny;
    routingInfo.longitudeDestiny = this.lonDestiny;
    this.coordinatesService.setRoutingInfo(routingInfo);
    this.coordinatesService.callComponentMethod();
  }

  setCoordinatesToMap() {
      this.coordinatesService.setNewCoordinatesMap(this.latDestiny, this.lonDestiny);
      this.coordinatesService.callComponentMethod();
      // this.hasCities = false;
      // this.modelPlaceOrigin = '';
      // this.modelPlaceDestiny = '';
  }


  getCitiesOrigin(textSearch: string) {
    if (textSearch) {
      this.tollApiService.getCities(textSearch).subscribe( res => {
        this.placesOrigin = res;
        this.hasPlacesOrigin = true;
      });
    }
    this.hasPlacesOrigin = false;
    console.log(textSearch);
  }

  getCitiesDestiny(textSearch: string) {
    if (textSearch) {
      this.tollApiService.getCities(textSearch).subscribe( res => {
        this.placesDestiny = res;
        this.hasPlacesDestiny = true;
      });
    }
    this.hasPlacesDestiny = false;
    console.log(textSearch);
  }
}
