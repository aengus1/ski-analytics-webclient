export enum ChartOrientation {
  VERTICAL,
  HORIZONTAL
}

export enum YLabelFormat {
  NUMERIC,
  INTERVAL
}


export class ChartOptions {

  constructor() {}

  public orientation: ChartOrientation = ChartOrientation.VERTICAL;
  public hasNumAxis = true;
  public hasNumLabel = false;
  public barSpacing: number;
  public yLabelFormat: YLabelFormat;

}
