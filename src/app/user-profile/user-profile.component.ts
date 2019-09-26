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
  blogAtId:any;
  fName:string;
  lName:string;
  email:string;
  // blogID:number;
  i:number;
   j:number;
  id:number;
 array:number[]=[];
  
  

  



  constructor(private blogService:BlogService,
    private serverService:ServerService,
    private authService:AuthServiceService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
  
    this.serverService.getMyBlogs()
    .subscribe(
      (response) => {
        this.res = response;
       
        console.log(this.res.blogs);
        this.blogs = this.res.blogs;

        for(this.i=0; this.i<this.blogs.length; this.i++){
          
          this.id = this.blogs[this.i].id;
          
          console.log(this.id);
         for(this.j=this.i; this.j<this.i+1; this.j++)
          {this.array.push(this.id);
          console.log(this.array);}
         
         
  
        }  


        this.blogService.setBlog(this.blogs);
     
      console.log(this.blogs);         
        this.fName = this.res.user.fname; 
        this.lName = this.res.user.lname;
        this.email = this.res.user.email;
        this.uName = this.res.user.username;
        
        

      },
      (error) => console.log(error),

    );
  }

 deleteBlog(id:any){
   
  
   console.log(id)

  this.serverService.DeleteBlog(id)
    .subscribe(
      (response) => {
        console.log(response);
        this.res = response;
        this.router.navigate(['/'])
        
      },
      (error) => {console.log(error),
      this.router.navigate(['/'])},


    );

 }


}
