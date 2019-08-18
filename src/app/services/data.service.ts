import { Injectable } from '@angular/core';

/** rxjs */
import { map } from 'rxjs/operators'; 
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs'; 

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

/** models */
import { Question } from "../models/question.model"; 

/** services */
import { CachingService } from "./caching.service"; 
 
@Injectable({
  providedIn: 'root'
})
export class DataService extends CachingService {

  //Url for question data
  private apiUrl = './assets/json/questions.json';
  
  //question observable
  private questions: Observable<Question[]>;  

  //we need to set up the HTTP client
  public constructor(private http: HttpClient) {
    super();
  }

  public getQuestions(): Observable<Question[]> {

    //api call
    //HTTP GET request to local 'questions.json' file for latest questions

    return this.cache<Question[]>(() => this.questions,
      (val: Observable<Question[]>) => this.questions = val, //Observable
      () => this.http
        .get(this.apiUrl)
          //map the response as per the Question model
          .pipe(map((response) => response as Question[] || []))
    ); 
    // .catch(this.errorHandler); 

  } 

  //error handler for api call
  private errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message) || "Server error";
  }

}