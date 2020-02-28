import {Component, OnInit} from '@angular/core';
import {CoordinatesService} from '../../geolocation/coordinates.service';

function getGeoJson() {
  return [

    [
      -74.039504,
      4.739907
    ],
    [
      -74.048147,
      4.738474
    ],
    [
      -74.028847,
      4.857842
    ],
    [
      -73.993982,
      4.928843
    ],
    [
      -73.91306,
      4.958952
    ],
    [
      -73.810103,
      5.053282
    ],
    [
      -73.726591,
      5.082511
    ],
    [
      -73.701762,
      5.106132
    ],
    [
      -73.68881,
      5.145868
    ],
    [
      -73.650073,
      5.164266
    ],
    [
      -73.592063,
      5.217802
    ],
    [
      -73.581413,
      5.305216
    ],
    [
      -73.545949,
      5.353768
    ],
    [
      -73.429474,
      5.43219
    ],
    [
      -73.433944,
      5.446132
    ],
    [
      -73.415038,
      5.442133
    ],
    [
      -73.343126,
      5.463815
    ],
    [
      -73.33018,
      5.491427
    ],
    [
      -73.351639,
      5.518364
    ],
    [
      -73.321022,
      5.593971
    ],
    [
      -73.324947,
      5.610055
    ],
    [
      -73.288258,
      5.640075
    ],
    [
      -73.244362,
      5.709101
    ],
    [
      -73.189559,
      5.750013
    ],
    [
      -73.119663,
      5.783256
    ],
    [
      -73.051842,
      5.790434
    ],
    [
      -73.015842,
      5.809588
    ],
    [
      -72.994878,
      5.792023
    ],
    [
      -72.996003,
      5.746686
    ],
    [
      -72.931853,
      5.716434
    ]
  ];
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [`
    mgl-map {
      height: 400px;
      width: 100%;
    }
  `]
})
export class MapComponent implements OnInit {

  zoom: number;
  centerLng: number;
  centerLat: number;
  geoJsonCoordinates: number[][];
  imageLoaded: boolean;


  constructor(private coordinatesService: CoordinatesService) {
    this.centerLng = -74.039504;
    this.centerLat =  4.739907;
    this.zoom = 14;
    this.getCoordinatesService(coordinatesService);
    this.geoJsonCoordinates = getGeoJson();
  }
  getCoordinatesService(coordinatesService: CoordinatesService) {
    this.coordinatesService.componentMethodCalled$.subscribe(() => {
      // console.log(`subscribe to coordinates service`);
      this.centerLat = coordinatesService.latitudeToMap;
      this.centerLng = coordinatesService.longitudeToMap;
      console.log(`moviendo mapa hacia -> ${this.centerLat} , ${this.centerLng}`);
    });
  }
  getCoordinates() {
    // console.log(`Call getCoordinates -> [ ${this.centerLng} , ${this.centerLat} ] `)
    return [this.centerLng, this.centerLat];
  }
  ngOnInit() {
  }


}



