import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';
import { ServerService } from '../services/server.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  blogs:Blog[]; 
  resp:any;
  i:number;
  j:number;
 id:number;
array:number[]=[];
 
        

  constructor(private blogService: BlogService,
    private serverService:ServerService,
    private ngxService: NgxUiLoaderService
    

   ) { }

  ngOnInit() { this.ngxService.start(); 
    this.serverService.getCreateBlog()
    .subscribe(
      (response) => {
        this.resp = response;
        console.log(this.resp.blogs);
        this.blogs = this.resp.blogs;
        for(this.i=0; this.i<this.blogs.length; this.i++){
          this.id = this.blogs[this.i].id;
          
         for(this.j=this.i; this.j<this.i+1; this.j++)
          {this.array.push(this.id);
          console.log(this.array);
        }
        

         
        this.ngxService.stop();
         
  
        }  

        
        
      },
      (error) => {console.log(error);
      },
    );
      
    
    
      
    
  //    this.blogs = this.blogService.getBlogs();
  //  console.log(this.blogs);
   
  }

  

}





