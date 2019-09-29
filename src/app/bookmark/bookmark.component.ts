import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Blog } from '../home/blog.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
blog:Blog[];
resp:any;
i:number;
j:number;
id:number;
array:number[]=[];
  constructor(private serverService:ServerService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit() { this.ngxService.start(); 
    this.serverService.userBookmark()
    .subscribe(
      (response) => {console.log(response);
        this.ngxService.stop(); 
        this.resp = response;
        this.blog = this.resp.blogs;
        console.log(this.blog);
        
        for(this.i=0; this.i<this.blog.length; this.i++){
          
          this.id = this.blog[this.i].id;
          
          console.log(this.id);
         for(this.j=this.i; this.j<this.i+1; this.j++)
          {this.array.push(this.id);
          console.log(this.array);}
         
         
  
        }  


      },
      (error) => {console.log(error);
        this.ngxService.stop();}

    );
  }

}
