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
import { StorageService } from "./storage.service"; 
import { CachingService } from "./caching.service";

const values_KEY = "values"; 
 
@Injectable({
  providedIn: 'root'
})
export class DataService extends CachingService {

  //Url for question data
  private apiUrl = './assets/json/questions.json';
  
  //question observable
  private questions: Observable<Question[]>;  
  private storage: Storage;

  //we need to set up the HTTP client
  public constructor(private storageService: StorageService, private http: HttpClient) {
    super();

    //get local storage
    this.storage = this.storageService.get();
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

  //save basket details (including contents) to local storage
  public saveStoredVaues(a,b,c,d): void {
    let values = [a,b,c,d]; 
    this.storage.setItem(values_KEY, JSON.stringify(values));
  } 

  public retrieveStoredVaues(): Array<any>{
    const storedValues = this.storage.getItem(values_KEY);
    return JSON.parse(storedValues);
  }

}