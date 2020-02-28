import { Component, OnInit } from '@angular/core';
import {TollApiService} from '../../geolocation/toll-api.service';
import {Place} from '../../geolocation/place';
import {CoordinatesService} from '../../geolocation/coordinates.service';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';



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

  places: Place[]  = [];
  modelPlace: string;
  hasCities: boolean;
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

  setCoordinatesToMap(lat: number, lon: number) {
    if (lat && lon) {
      this.coordinatesService.setNewCoordinatesMap(lat, lon);
      this.coordinatesService.callComponentMethod();
      this.hasCities = false;
      this.modelPlace = '';
    }
  }


  getCities(textSearch: string) {
    if (textSearch) {
      this.tollApiService.getCities(textSearch).subscribe( res => {
        this.places = res;
        this.hasCities = true;
      });
    }
    this.hasCities = false;
    console.log(textSearch);
  }
}
