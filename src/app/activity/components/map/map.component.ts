import {AfterViewInit, Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
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
export class MapComponent implements  AfterViewInit {

  @ViewChild(Map) map;

  @Input()
  public activity: Activity;

  private center;
  private latList;
  private lonList;
  private activityTrack;

  constructor() {
  }

  ngAfterViewInit() {
      this.latList = this.activity.getValues().getLatList().filter(x => x !== -999);
      this.lonList = this.activity.getValues().getLonList().filter(x => x !== -999);
      this.center = [this.lonList[0], this.latList[0]];
    // this.center = [-122.48, 37.83];
    this.activityTrack = this.buildTrackGeoJson();
  }

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
}
