import {YLabelFormat} from '../d3-bar/ChartOptions';

export class DataSeries {
  constructor(private _name: string, private _index: number, private _color: string,
              private _dataType: YLabelFormat, private _enabled: boolean) {

  }
  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  get dataType(): YLabelFormat {
    return this._dataType;
  }

  set dataType(value: YLabelFormat) {
    this._dataType = value;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

   get name(){
     return this._name;
   }
   set name(name: string) {
     this._name = name;
   }
}
