import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MapService} from 'ngx-mapbox-gl';
import {Map} from 'mapbox-gl';
import {Activity} from '../../model/activity/Activity_pb';


@Component({
  selector: 'app-map-container',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MapService]
})
export class MapComponent implements  AfterViewInit, OnInit {

  @ViewChild(Map) map;

  @Input()
  public activity: Activity;

  private center;
  private latList;
  private lonList;
  private coords;
  private activityTrack;
  constructor() {
  }

  ngOnInit() {
    this.latList = this.activity.getValues().getLatList().filter(x => x !== -999 && !isNaN(x));
    this.lonList = this.activity.getValues().getLonList().filter(x => x !== -999 && !isNaN(x));
    this.center = [this.lonList[0], this.latList[0]];
    this.coords = [];
    this.latList.forEach((x, i) => this.coords.push([this.lonList[i], x]));

  }
  ngAfterViewInit() {
    this.activityTrack = this.buildTrackGeoJson();
  }

  /**
   * convert lat and lon lists to simple geojson linestring
   * @returns {{type: string; data: {type: string; properties: {}; geometry: {type: string; coordinates: any[]}}}}
   */
  buildTrackGeoJson() {
    const coords = [];
    this.latList.forEach((x, i) => coords.push([this.lonList[i], x]));
    return {
      'type': 'geojson',
      'data': {
      'type': 'Feature',
        'properties': {},
      'geometry': {
        'type': 'LineString',
          'coordinates': coords
      }
    }
    };
  }

  /**
   * return every 30th index to draw map markers at
   * @returns {any[]}
   */
  buildMarkerIndexes() {
    const indices = [];
    indices.push(0);
    indices.push(this.lonList.length - 1);
    let i = 0;
    while ((i += 30) < this.lonList.length - 1) {
      indices.push(i);
    }
    return indices;
  }
}
