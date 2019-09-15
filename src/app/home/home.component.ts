import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  blogs:Blog[]; 
  
 
        

  constructor(private blogService: BlogService,
    private router:Router,
    private route :ActivatedRoute,) { }

  ngOnInit() {   
    
    
      
    
     this.blogs = this.blogService.getBlogs();
  }

}





