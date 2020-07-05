import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { AuthAPIService } from '../auth/auth.service';
import { throwError } from 'rxjs';

const endpoint = '/comedyrealapi/comedyreal/'


@Injectable({
  providedIn: 'root'
})
export class ComedyrealService {

  constructor(private http: HttpClient, private authAPI: AuthAPIService) { }

  headers = new HttpHeaders({
'Content-Type': 'application/json',
});

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
