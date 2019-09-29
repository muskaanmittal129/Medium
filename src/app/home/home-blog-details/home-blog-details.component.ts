import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog.model';
import { ServerService } from 'src/app/services/server.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import {MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { SigninComponent } from 'src/app/auth/signin/signin.component';


@Component({
  selector: 'app-home-blog-details',
  templateUrl: './home-blog-details.component.html',
  styleUrls: ['./home-blog-details.component.css'],
})
export class HomeBlogDetailsComponent implements OnInit {                
  blog:Blog[];
  blogId:number;
  isBookmarked :boolean;
  ifClick = false;
  res:any; 
  view=false;
  
  

 
  @ViewChild('clap', { static: false }) clap: any;


  constructor(private blogService: BlogService,
    private route: ActivatedRoute,
    private serverService: ServerService,
    private ngxService: NgxUiLoaderService,
    private authService:AuthServiceService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() { this.ngxService.start();
    this.blogId = this.route.snapshot.params.blogID;
    this.serverService.getBlogDetail(this.blogId)
      .subscribe(
        (response) => { this.ngxService.stop();
        this.view = true;
          this.res = response;
          console.log(response);
          this.isBookmarked = this.res.isBookmarked;
          console.log(this.isBookmarked);
        
          this.blog = this.res.blog;
        },
        (error) => {console.log(error),
          this.ngxService.stop()}
      );
  }

  fillClap() {
    if(this.authService.getToken()){
    this.ifClick = true;
    setTimeout(() => {
      this.ifClick = false;
    }, 250);
    this.serverService.addClap(this.blogId)
      .subscribe(async response => {
        console.log(response);
      });
      
   this.clap.nativeElement.innerHTML = +this.clap.nativeElement.innerHTML + 1;}

     else{const dialogConfig =  new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = false;
      
      dialogConfig.width = "60%"; 
      dialogConfig.height = "90%"; 
      this.dialog.open(SigninComponent,dialogConfig)
  

     }



  }

  fill(){if(this.authService.getToken()){
    this.isBookmarked = true;
    console.log(this.blogId);
    this.serverService.bookmark(this.blogId)
    .subscribe(
      (response) =>{ console.log(response);
        
      
        },
       
       

    );
  }else{const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    
    dialogConfig.width = "60%"; 
    dialogConfig.height = "90%"; 
    this.dialog.open(SigninComponent,dialogConfig)

  }
  }
    
  
  unfill(){
    this.isBookmarked = false;
    this.serverService.bookmark(this.blogId)
    .subscribe(
      (response) => {console.log(response);
        },
       (error) => console.log(error),

    );
  }
 



} 
