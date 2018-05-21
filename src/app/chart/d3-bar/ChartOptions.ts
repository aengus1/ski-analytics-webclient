export enum ChartOrientation {
  VERTICAL,
  HORIZONTAL
}


export class ChartOptions {

  constructor() {}

  public orientation: ChartOrientation = ChartOrientation.VERTICAL;
  public hasNumAxis = true;
  public hasNumLabel = false;

}
