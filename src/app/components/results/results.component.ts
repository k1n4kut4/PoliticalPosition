import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

/** rxjs */
import { Observer, Observable, Subscription } from "rxjs";

/** models */
import { Ideology } from "../../models/ideology.model";

/** services */ 
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit { 

  public ideologies: Ideology[]; 
  public ideology: any;
  private ideologiesSubscription: Subscription;
  public ideodist: any; 

  public econ: number; 
  public dipl: number; 
  public govt: number; 
  public scty: number; 

  public econTag: string;
  public diplTag: string;
  public govtTag: string;
  public sctyTag: string;

  public econArray: any;
  public diplArray: any;
  public govtArray: any; 
  public sctyArray: any; 
  
  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private data: DataService,) { }

  ngOnInit() {

    //this.current_question = parseInt(this.route.snapshot.paramMap.get('id')); 

    let savedValues = this.data.retrieveStoredVaues(); 

    this.econ = parseInt(savedValues[0]);
    this.dipl = parseInt(savedValues[1]);
    this.govt = parseInt(savedValues[2]);
    this.scty = parseInt(savedValues[3]);

    this.econArray = ["Communist","Socialist","Social","Centrist","Market","Capitalist","Laissez-Faire"];
    this.diplArray = ["Cosmopolitan","Internationalist","Peaceful","Balanced","Patriotic","Nationalist","Chauvinist"];
    this.govtArray = ["Anarchist","Libertarian","Liberal","Moderate","Statist","Authoritarian","Totalitarian"];
    this.sctyArray = ["Revolutionary","Very Progressive","Progressive","Neutral","Traditional","Very Traditional","Reactionary"];
    
    this.econTag = this.setLabel((this.econ-1), this.econArray);
    this.diplTag = this.setLabel((this.dipl-1), this.diplArray);
    this.govtTag = this.setLabel((this.govt-1), this.govtArray);
    this.sctyTag = this.setLabel((this.scty-1), this.sctyArray);

    //subscribe to ideologies, from ideologies.json
    this.ideologiesSubscription = this.data.getIdeologies().subscribe(res => { 

      this.ideologies = res;

      console.log(this.ideologies);

      for (var i = 0; i < this.ideologies.length; i++) {
  
          let dist = 0
  
          dist += Math.pow(Math.abs(this.ideologies[i].econ - (this.econ-1)), 2)
          dist += Math.pow(Math.abs(this.ideologies[i].govt - (this.dipl-1)), 2)
          dist += Math.pow(Math.abs(this.ideologies[i].dipl - (this.govt-1)), 1.73856063)
          dist += Math.pow(Math.abs(this.ideologies[i].scty - (this.scty-1)), 1.73856063)

          this.ideodist = Infinity;
          if (dist < this.ideodist) {
            this.ideology = this.ideologies[i].name
            this.ideodist = dist
          } 
  
      }

    });  

  } 

  ngOnDestroy(): void {

    //destroy the ideologies subscription
    if (this.ideologiesSubscription) {
      this.ideologiesSubscription.unsubscribe();
    }

  }

  private setLabel(val,ary) {
      if (val > 100) { return "" } else
      if (val > 90) { return ary[0] } else
      if (val > 75) { return ary[1] } else
      if (val > 60) { return ary[2] } else
      if (val >= 40) { return ary[3] } else
      if (val >= 25) { return ary[4] } else
      if (val >= 10) { return ary[5] } else
      if (val >= 0) { return ary[6] } else
        {return ""}
  }

}
