import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  blogs:Blog[]; 
  resp:any;
 
 
        

  constructor(private blogService: BlogService,
    private serverService:ServerService,
   

   ) { }

  ngOnInit() { 
    this.serverService.getCreateBlog()
    .subscribe(
      (response) => {
        this.resp = response;
        console.log(this.resp.blogs);
        this.blogs = this.resp.blogs;
        this.blogService.setBlog(this.blogs);
      },
      (error) => {console.log(error);
      },
    );
      
    
    
      
    
  //    this.blogs = this.blogService.getBlogs();
  //  console.log(this.blogs);
   
  }
 

}





