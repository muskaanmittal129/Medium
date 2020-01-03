import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../home/blog.service';
import { ServerService } from '../services/server.service';
import { Blog } from '../home/blog.model';
import { AuthServiceService } from '../services/auth-service.service';

import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  uName:string;
  res:any;
  blogs:Blog[];
  blogAtId:any;
  name:string;
  email:string; 
  // blogID:number;
  i:number;
   j:number;
  id:number;
 array:number[]=[];
  subscription:any; 
  

  



  constructor(private blogService:BlogService,
    private serverService:ServerService,
    private authService:AuthServiceService,
    private router:Router,
    
    private route:ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    
    ) { }

  ngOnInit() {

    

    this.ngxService.start();
    this.subscription = this.serverService.getMyBlogs()
    .subscribe(
      (response) => {
        this.ngxService.stop();
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
        this.name = this.res.user.name;
        this.email = this.res.user.email;
        this.uName = this.res.user.username;
        
        

      },
      (error) => console.log(error),

    );
  }

 deleteBlog(id:any){
   
  this.ngxService.start(); 
   console.log(id)

  this.serverService.DeleteBlog(id)
    .subscribe(
      (response) => {this.ngxService.stop(); 
        console.log(response);
        this.res = response;
        if(this.res.message){
        this.router.navigate(['/home']);
      Swal.fire({
        title:this.res.message,
        type:"success",
        showConfirmButton:false,
        timer:2000,
  

      });};
        
      },
      (error) => {console.log(error),
        this.ngxService.stop(); }
     

 
    );

 }

 ngOnDestroy(){
  if (this.subscription){
  this.subscription.unsubscribe();}
 }


}
