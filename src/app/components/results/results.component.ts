import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

/** rxjs */
import { Observer, Observable, Subscription } from "rxjs";

/** models */
import { Question } from "../../models/question.model"; 

/** services */ 
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit { 

  public questions: Question[]; 
  public question: Observable<Question>;
  private questionsSubscription: Subscription;

  public current_question: number;  

  public econ: number; 
  public dipl: number; 
  public govt: number; 
  public scty: number; 

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
 

  } 

}
