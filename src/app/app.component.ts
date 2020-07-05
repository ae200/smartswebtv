import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit, OnDestroy {
title = '3SMARTSFLIX TV';
description = 'The Home of 3D Animated Movies';
private routeSub: any;
query: string;
LogoDefaultImage = 'static/ang/assets/images/nature/3smartsflixlogoreduced65.png';
constructor(private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe(params => {
    this.query = params['q'];
       });
}

ngOnInit() {
    
   }
   ngOnDestroy() {
this.routeSub.unsubscribe();
   }
}

