import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthLoginData } from './auth';
import { AuthAPIService} from './auth.service'; 
import { User } from './user';


interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
    
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  
  userData: User;
  didLogin = false;
  isSubmitted = false;
  tokenExists = false;
  authLoginSub: any;
  registerMode = false;
  registerLoginSub: any;

  constructor(
    private authAPI: AuthAPIService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService) { }

  ngOnInit(): void {

    this.tokenExists = this.authAPI.checkToken()
    
  } 

  saveForm() {
    if (!this.registerMode) {
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authLoginSub = this.authAPI.loginUser(this.loginForm.value).subscribe(
    (result: TokenObj) => {
      this.userData = result as User;
      //console.log(result);
      let token = this.userData.token || null
      let date = new Date () 
      this.authAPI.performLogin(token, date)
      this.cookieService.set('auth-token', result.token)
      this.didLogin = true;
    }, 
    error => console.log(error) 
    );
   } else {
     this.registerLoginSub = this.authAPI.registerUser(this.loginForm.value).subscribe(
      result => {
      
     console.log(result);
      
    }, 
    error => console.log(error) 
    );
   }
  }
   
  get formControls() {
    let authLoginData = new AuthLoginData(
      this.loginForm.value['username'],
      this.loginForm.value['password'])
      return this.loginForm.controls;
     //console.log(authLoginData) 
   }

  performLogout(msg?:string){
   this.cookieService.delete('auth-token', '/')
   this.router.navigate(['/login'])
   //console.log(msg)
  } 

  ngOnDestroy(){
    if (this.authLoginSub){
      this.authLoginSub.unsubscribe()
    }
  } 
}