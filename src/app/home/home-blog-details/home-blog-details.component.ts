import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog.model';


@Component({
  selector: 'app-home-blog-details',
  templateUrl: './home-blog-details.component.html',
  styleUrls: ['./home-blog-details.component.css']
})
export class HomeBlogDetailsComponent implements OnInit {
  blog:Blog; 
  id:number;


  constructor(private blogService:BlogService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        this.blog = this.blogService.getBlogOfIndex(this.id);
      }
      )
  }

}
