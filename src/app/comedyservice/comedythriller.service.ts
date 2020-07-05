import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import {HttpResponse } from '@angular/common/http';

import { throwError } from 'rxjs';

const endpoint = '/comedythrillerapi/comedythriller/'

@Injectable({
  providedIn: 'root'
})
export class ComedythrillerService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(endpoint)
        .pipe(map((response => response)))
        .pipe(catchError((this.handleError)))
}

featured() {
    return this.http.get(endpoint + "featured/")
        .pipe(map((response => response)))
        .pipe(catchError((this.handleError)))
}

 
get(slug) {
    return this.http.get(endpoint + slug + "/")
        .pipe(map((response => response)))
        .pipe(catchError((this.handleError)))
    }


search(query) {
    let queryString = `?q=${query}`
    return this.http.get(endpoint + queryString)
        .pipe(map((response => response)))
        .pipe(catchError((this.handleError)))

    }

private handleError (error: Response | any){
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        errMsg = `${error.status} - ${error.statusText || ''}`;
    } else {
          errMsg = "Oops not free."; 
        }
        //console.error(errMsg);
    return throwError(errMsg);
    }
}
