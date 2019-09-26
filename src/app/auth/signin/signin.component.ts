import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NgForm } from '@angular/forms';

import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { GetstartedComponent } from '../getstarted/getstarted.component';
import { ServerService } from 'src/app/services/server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BlogService } from 'src/app/home/blog.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  // @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  usname:any;
  errorMsg:string;
  resp:any;
  uName:string;

  constructor(private serverService:ServerService,
    private dialogRef:MatDialogRef<GetstartedComponent>,
    private dialog: MatDialog,
    private blogService:BlogService,
    private router:Router,) { } 

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
    console.log(JSON.stringify(form.value));
    const value = form.value;
    this.serverService.signInUser(value.username,value.password )
    .subscribe(
      
      response => {this.resp = response;
        console.log(this.resp);
        
        this.usname = this.resp.username;
        // this.notify.emit(this.usname);
        localStorage.setItem('token', this.resp.token);
        localStorage.setItem('username', this.resp.username);
        
        console.log(this.usname);

       
        this.blogService.setUsername(this.usname);
        if(this.resp.message === 'signin successful'){
          alert("Signin Successful");
        }
       
        
        
        this.onClose();
        form.reset();},


        (error:HttpErrorResponse) => {
       
          console.log(error);
          this.errorMsg = error.error.message;
          this.uName =  error.error.username;
          alert(this.errorMsg || "Server Error");

          if(this.errorMsg === 'Your email is not verified. Enter OTP to continue'){
            this.onClose();
        form.reset();
         
            this.router.navigate(['/verify', this.uName]);}
         

          
        
        }  
    );
   

    
   
  }


}
