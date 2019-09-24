import { Component, OnInit } from '@angular/core';
import { BlogService } from '../home/blog.service';
import { ServerService } from '../services/server.service';
import { Blog } from '../home/blog.model';
import { AuthServiceService } from '../services/auth-service.service';

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
  
  fName:string;
  lName:string;
  email:string;
  // blogID:number;
  id:number;
  
  

  



  constructor(private blogService:BlogService,
    private serverService:ServerService,
    private authService:AuthServiceService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    // this.route.params.subscribe(
    //   params => {
    //     this.index = +params['id'];
    //     this.blog = this.blogService.getBlogOfIndex(this.index);
    //   }
    //   );

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
      //   this.blogId = this.res.blogs.title;
      console.log(this.blogs); 
     
      
        
      
        
        this.fName = this.res.user.fname; 
        this.lName = this.res.user.lname;
        this.email = this.res.user.email;
        this.uName = this.res.user.username;
       
        console.log(this.res.blogs[this.blogService.blogID].id);
          localStorage.setItem('blogID',this.res.blogs[this.blogService.blogID].id );
        

      },
      (error) => console.log(error),

    );
  }

}
