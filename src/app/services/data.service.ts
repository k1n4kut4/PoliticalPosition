import { Injectable } from '@angular/core';

/** rxjs */
import { map, filter } from 'rxjs/operators'; 
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw'; 
import { Observer, Observable, Subscription } from "rxjs";

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

/** models */
import { Question } from "../models/question.model"; 
import { Ideology } from "../models/ideology.model";

/** services */
import { StorageService } from "./storage.service"; 
import { CachingService } from "./caching.service";

const values_KEY = "values"; 
 
@Injectable({
  providedIn: 'root'
})
export class DataService extends CachingService {

  //Url for question data
  private apiUrl = './assets/json/'; 
  
  //question observable
  private questions: Observable<Question[]>;  
  private questionsSubscription: Subscription;
  private ideologies: Observable<Ideology[]>;  
  private storage: Storage;
  
  public z: any;

  //we need to set up the HTTP client
  public constructor(private storageService: StorageService, private http: HttpClient) {
    super();

    //get local storage
    this.storage = this.storageService.get();
  }

  public getQuestions(): Observable<Question[]> { 

    //api call
    //HTTP GET request to local 'questions.json' file for latest questions
    let i =0;
    return this.cache<Question[]>(
      () => this.questions,
        (val: Observable<Question[]>) => this.questions = val, //Observable
        () => this.http
          .get(this.apiUrl + 'questions.json')
            //map the response as per the Question model
            .pipe(
              map(
                (response) => (response as Question[] || [])
              )
            )
    );  //.catch(this.errorHandler)  
    
  }   

  public getIdeologies(): Observable<Ideology[]> {

    //api call
    //HTTP GET request to local 'ideologies.json' file for latest questions

    return this.cache<Ideology[]>(
      () => this.ideologies,
        (val: Observable<Ideology[]>) => this.ideologies = val, //Observable
        () => this.http
          .get(this.apiUrl+'ideologies.json')
            //map the response as per the Question model
            .pipe(
              map((response) => response as Ideology[] || [])
            )
    ); 
    // .catch(this.errorHandler)

  } 

  //error handler for api call
  private errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message) || "Server error";
  }

  //save basket details (including contents) to local storage
  public saveStoredVaues(a,b,c,d): void {
    let values = [a,b,c,d]; 
    this.storage.setItem(values_KEY, JSON.stringify(values));
  } 

  public retrieveStoredVaues(): Array<any>{
    const storedValues = this.storage.getItem(values_KEY);
    return JSON.parse(storedValues);
  }

  //resets the values, by replacing with values set to [0,0,0,0]
  public resetStoredVaues(): void {
    let values = [0,0,0,0]; 
    this.storage.setItem(values_KEY, JSON.stringify(values));
  } 

}