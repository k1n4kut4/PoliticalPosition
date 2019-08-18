import { Component, OnInit, OnDestroy } from '@angular/core';

/** rxjs */
import { Observer, Observable, Subscription } from "rxjs";

/** models */
import { Question } from "../../models/question.model"; 

/** services */ 
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public questions: Question[]; 
  public question: Observable<Question>;
  private questionsSubscription: Subscription;
  public current_question: number;  

  constructor(private data: DataService) { }

  ngOnInit() {

    this.current_question = 1;

    //subscribe to questions, from questions.json
    this.questionsSubscription = this.data.getQuestions().subscribe(res => { 
      this.questions = [];
      this.questions.push(res[this.current_question-1]);
    });  

  }

  ngOnDestroy(): void {

    //destroy the questions subscription
    if (this.questionsSubscription) {
      this.questionsSubscription.unsubscribe();
    }

  }



}
