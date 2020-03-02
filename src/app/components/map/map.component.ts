import {Component, OnInit} from '@angular/core';
import {CoordinatesService} from '../../geolocation/coordinates.service';
import {RoutingInfo} from '../../geolocation/routing-info';
import {TollApiService} from '../../geolocation/toll-api.service';
import {SourceRoute} from '../../geolocation/source-route';


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
  imageLoaded: boolean;
  sourceData = {};
  routeList: SourceRoute[] = [];
  countRoute = 0;
  distance: string;


  constructor(private coordinatesService: CoordinatesService, private tollApiService: TollApiService) {
    this.centerLng = -74.039504;
    this.centerLat =  4.739907;
    this.zoom = 14;
    // this.getCoordinatesService(coordinatesService);
    this.getRoutingInfo(coordinatesService);
    // this.geoJsonCoordinates = getGeoJson();
  }

  getGeoJson(routingInfo: RoutingInfo) {
    this.sourceData = undefined;
    if ( routingInfo ) {
      this.tollApiService.getRouteCoordinates(routingInfo).subscribe(res  => {
        this.sourceData = {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: res.data
            }
          }
        };
        this.countRoute += 1;
        const sourceRoute: SourceRoute = new SourceRoute();
        sourceRoute.id = 'my-route-' + this.countRoute.toString();
        sourceRoute.data = this.sourceData;
        this.routeList.push(sourceRoute);
        this.centerMap(this.sourceData, res.distance);
      });
    }
  }


  private centerMap(sourceData: any, distance: number) {
    // console.log('method centerMap');
    const dataGeoJson: [] = sourceData.data.geometry.coordinates;
    if (dataGeoJson) {
      console.log(dataGeoJson);
      const centerCoordinates = dataGeoJson[Math.round(dataGeoJson.length / 2)];
      console.log(`coordinates center -> ${JSON.stringify(centerCoordinates)}` );
      this.centerLat = centerCoordinates[1];
      this.centerLng = centerCoordinates[0];
      this.zoom = this.getZoomFromQuantityPoints(distance);
      this.distance = distance.toString() + ' kms';
    }
  }

  private getZoomFromQuantityPoints(distance: number) {
    console.log(`distance -> ${distance}`)
    if (distance > 1000) {
      return 3;
    } else if (distance > 700 && distance < 1000) {
      return 4;
    } else if (distance > 500 && distance < 700) {
      return 5;
    } else if (distance > 300 && distance < 500) {
      return 6;
    } else if (distance > 100 && distance < 300) {
      return 7;
    } else if (distance > 60 &&  distance < 100) {
      return 9;
    } else if (distance < 60) {
      return 11;
    }
    return 13;
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


  getRoutingInfo(coordinatesService: CoordinatesService) {
    this.coordinatesService.componentMethodCalled$.subscribe(() => {
      const routingInfoMap: RoutingInfo = coordinatesService.routingInfo;
      this.routeList = [];
      this.getGeoJson(routingInfoMap);
    });
  }


}



