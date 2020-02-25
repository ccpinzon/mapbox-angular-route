import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TollApiService} from '../../geolocation/toll-api.service';
import {Place} from '../../geolocation/place';
import {CoordinatesService} from '../../geolocation/coordinates.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  places: Place[]  = [];

  constructor(private formBuilder: FormBuilder,
              private tollApiService: TollApiService,
              private coordinatesService: CoordinatesService) { }
  taskForm: FormGroup = this.formBuilder.group({
    searchTextForm: ''
  });

  ngOnInit(): void {
  }

  searchCity() {
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
  }

}
