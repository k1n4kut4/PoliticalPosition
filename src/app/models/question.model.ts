export class Question {
  public question: string;
  public econ: number; 
  public dipl: number; 
  public govt: number; 
  public scty: number; 

  public updateFrom(src: Question): void {
    this.question = src.question;
    this.econ = src.econ;
    this.dipl = src.dipl;
    this.govt = src.govt;
    this.scty = src.scty;
  }
}