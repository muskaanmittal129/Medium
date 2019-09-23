import { Component, OnInit } from '@angular/core';
import { BlogService } from '../home/blog.service';
import { ServerService } from '../services/server.service';
import { Blog } from '../home/blog.model';
import { AuthServiceService } from '../services/auth-service.service';
import { UserDetail } from '../shared/user-detail.model';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  uName:string;
  res:any;
  blogs:Blog[]
  udetail:UserDetail[];
  fName:string;
  lName:string;
  email:string;
  blog:Blog;
  index:number;
  

  



  constructor(private blogService:BlogService,
    private serverService:ServerService,
    private authService:AuthServiceService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.index = +params['id'];
        this.blog = this.blogService.getBlogOfIndex(this.index);
      }
      );

    // this.uName = this.blogService.users;
    // this.uName=  this.authService.getUsername();
    console.log(this.uName);
    this.serverService.getMyBlogs()
    .subscribe(
      (response) => {
        this.res = response;
       
        console.log(this.res.blogs);
        this.blogs = this.res.blogs;
        this.blogService.setBlog(this.blogs);
       
        this.udetail = this.res.user;
        
        this.fName = this.udetail.fname;
        this.lName = this.udetail.lname;
        this.email = this.udetail.email;
        this.uName = this.udetail.username;
        localStorage.setItem('blogID', this.blogs[this.index].id);
        
        

      },
      (error) => console.log(error),

    );
  }

}
