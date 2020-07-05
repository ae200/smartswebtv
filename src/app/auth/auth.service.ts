import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

//import { Observable } from 'rxjs';
//import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthLoginData } from './auth';
import { User } from './user';
//import {UserRegisterData } from '../register/register';


//import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import {SafePipe} from '../utility/safe.pipe';

// const httpOptions = {
//   headers: new HttpHeaders({"Content-Type": 'application/json'})
// }


@Injectable()
export class AuthAPIService {

  private baseUrl = 'http://localhost:8000/accountapi/';
  private nextUrl;
  headers = new HttpHeaders({
  'Content-Type': 'application/json',
});   
constructor(
  private http: HttpClient,
  private router: Router,
  private cookieService: CookieService,
  private route: ActivatedRoute
  ) { }

// createHeaders(token?:string) {
//   let data = {
//     "Content-Type": 'application/json',
//   }
//   if (token){
//     data['Authorization'] = `JWT ${token}`
//   }
   
//    let httpOptions = {
//         headers: new HttpHeaders(data)
//    }

//    return httpOptions
// }

 
checkToken(){
    return this.cookieService.check("auth-token")
}


performLogout(msg?:string){
  this.cookieService.delete('auth-token', '/')
  this.router.navigate(['/login'])
  console.log(msg)
}

getNextUrl(){
  this.route.queryParams.subscribe(params=>{
    if (params['next']) {
      this.nextUrl = params['next']
      switch (this.nextUrl) {
        case "/account/delete":
          this.nextUrl = null
          break;
        
        default:
          // code...
          break;
      }
    }
  })
  return this.nextUrl
}

setUserCookie(user:User) {
  this.cookieService.set('username', user.username)
  this.cookieService.set('email', user.email)
}

getUsername(): string{
  return this.cookieService.get('username') || null
}

getEmail(): string{
  return this.cookieService.get('email') || null
}

performLogin(token, expires?:Date, msg?:string){
  let expiryDate = null
  if (expires) {
    expiryDate =  expires 
  }
  this.cookieService.set('auth-token', token, expiryDate, "/");
  const nextUrl = this.getNextUrl()
  if (nextUrl) {
    this.router.navigate([nextUrl])
  } else {
    this.router.navigate(['/movies'])
  }
}


// performRegister(token, expires?:Date, msg?:string){
//   let expiryDate = null
//   if (expires) {
//     expiryDate =  expires 
//   }
//   this.cookieService.set('jwttoken', token, expiryDate, "/");
//   const nextUrl = this.getNextUrl()
//   if (nextUrl) {
//     this.router.navigate([nextUrl])
//   } else {
//     this.router.navigate(['/login'])
//   }
// }


loginUser(authData) {
  //let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkZWdiZW5nYUAzc21hcnRzZmxpeCIsImV4cCI6MTU5MDY3NDExOSwiZW1haWwiOiJ0aHJlZXNtYXJ0c2ZsaXhAaG90bWFpbC5jb20ifQ.EuxN254cfbeoorqBZ5h2kHKPjXp83eNXL72AsIyign8'
  //let httpOptions = this.createHeaders()
  const body = JSON.stringify(authData); 
  let apiLoginEndpoint = `${this.baseUrl}auth/`
   return  this.http.post(apiLoginEndpoint, body, {headers: this.getAuthHeaders()}) //httpOptions
  }

registerUser(authData) {
  //let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkZWdiZW5nYUAzc21hcnRzZmxpeCIsImV4cCI6MTU5MDY3NDExOSwiZW1haWwiOiJ0aHJlZXNtYXJ0c2ZsaXhAaG90bWFpbC5jb20ifQ.EuxN254cfbeoorqBZ5h2kHKPjXp83eNXL72AsIyign8'
  //let httpOptions = this.createHeaders()
  const body = JSON.stringify(authData); 
  let apiLoginEndpoint = `${this.baseUrl}users/`
   return  this.http.post(apiLoginEndpoint, body, {headers: this.getAuthHeaders()}) //httpOptions
  }


getAuthHeaders() {
  const token= this.cookieService.get('auth-token');
  return new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`
    });
  }   
}
