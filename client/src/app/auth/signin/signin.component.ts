import { Component, OnInit} from '@angular/core';

import { NgForm } from '@angular/forms';

import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { GetstartedComponent } from '../getstarted/getstarted.component';
import { ServerService } from 'src/app/services/server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BlogService } from 'src/app/home/blog.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  usname:any;
  errorMsg:string;
  resp:any;
  uName:string;

  constructor(private serverService:ServerService,
    private dialogRef:MatDialogRef<GetstartedComponent>,
    private dialog: MatDialog,
    private blogService:BlogService,
    private router:Router,
    private ngxService: NgxUiLoaderService) { } 

  ngOnInit() {
   
    
    
      
  }

  navigateToSignup(){
   
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%"; 
    dialogConfig.height = "90%";
    this.dialog.open(GetstartedComponent,dialogConfig)


  }

  onClose(){
    this.dialogRef.close();
  }

  onSignin(form:NgForm){
    this.ngxService.start();
    
    const value = form.value;
    this.serverService.signInUser(value.username,value.password )
    .subscribe(
      
      response => {
        this.ngxService.stop();
        this.resp = response;
        
        
        this.usname = this.resp.username;
        
        localStorage.setItem('token', this.resp.token);
        localStorage.setItem('username', this.resp.username);
        
        

       
        this.blogService.setUsername(this.usname);
        
         
          
          Swal.fire({
            title: this.resp.message,
           
            type: "success",
           
          });
       
        
        
        this.onClose();
        form.reset();},


        (error:HttpErrorResponse) => {
          this.ngxService.stop();
          
          this.errorMsg = error.error.message;
          this.uName =  error.error.username;
         
          Swal.fire({
            title: this.errorMsg,
           
            type: "warning",
           
          });

          if(this.errorMsg === 'Your email is not verified. Enter OTP to continue'){
            this.onClose();
        form.reset();
         
            this.router.navigate(['/verify', this.uName]);}
         

          
        
        }  
    );
   

    
   
  }


}
