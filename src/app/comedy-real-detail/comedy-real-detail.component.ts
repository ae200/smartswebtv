import { Component, OnInit, OnDestroy } from '@angular/core';

import { HomeComponent } from '@src/app/home/home.component';

import { ActivatedRoute, Router } from '@angular/router';

import { SafePipe } from '../utility/safe.pipe';
import { DomSanitizer} from '@angular/platform-browser';

import { ComedyRealMovieItem } from '../comedymovies/comedymovie';
import { ComedyrealService } from '../comedyservice/comedyreal.service';

@Component({
  selector: 'app-comedy-real-detail',
  templateUrl: './comedy-real-detail.component.html',
  styleUrls: ['./comedy-real-detail.component.css'],
  providers: [ComedyrealService]
})
export class ComedyRealDetailComponent implements OnInit, OnDestroy {
	private routeSub: any;
    private req: any;
    comedyrealmovie:ComedyRealMovieItem;
    slug: string;
    errorStr: Boolean;
    EmbedUrl:any;
    dangerousEmbedUrl:any;

  constructor(private route: ActivatedRoute, private _comedyrealservice: ComedyrealService, private sanitizer: DomSanitizer, private _safe: SafePipe) { }

  ngOnInit(): void {
  	this.routeSub = this.route.params.subscribe(params => {
    this.slug =  params.slug;
    this.req = this._comedyrealservice.get(this.slug).subscribe((data: any) => {
    this.comedyrealmovie = data as ComedyRealMovieItem;
    }, error =>{
           this.errorStr = error;
    });
    });
  }
   ngOnDestroy() {
       this.routeSub.unsubscribe();
       this.req.unsubscribe();
    }
  //   getEmbedUrl(item) {
  //   return 'https://www.youtube.com/embed/' + item.embed + '';
  // } 

  getEmbedUrl(item) {
    return 'https://www.youtube.com/embed/' + item.embed + '';
   }
}
                     