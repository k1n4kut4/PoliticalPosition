export class Ideology {
  public name: string;
  public econ: number; 
  public dipl: number; 
  public govt: number; 
  public scty: number; 

  public updateFrom(src: Ideology): void {
    this.name = src.name;
    this.econ = src.econ;
    this.dipl = src.dipl;
    this.govt = src.govt;
    this.scty = src.scty;
  }
}