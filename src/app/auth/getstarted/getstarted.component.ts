import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { SigninComponent } from '../signin/signin.component';
import { ServerService } from 'src/app/services/server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';






@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.css']
})
export class GetstartedComponent implements OnInit {
  public errorMsg:string;
  public errUsername =false;
  public errEmail =false;
  public errConfirmPassword =false;
  public resp:any;
  
 
  

  constructor(private serverService:ServerService,
    private router:Router,
    private dialog: MatDialog,
    private dialogRef:MatDialogRef<GetstartedComponent>,
    private ngxService: NgxUiLoaderService) { }
 
  ngOnInit() {
  }


  navigateToSignin(){
    // this.router.navigate(['signin'],{relativeTo:this.route});
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    
    dialogConfig.width = "60%"; 
    dialogConfig.height = "90%"; 
    this.dialog.open(SigninComponent,dialogConfig)

  } 

  onClose(){
    this.dialogRef.close();
   
  }

  onSignup(form:NgForm){
    this.ngxService.start();
    console.log(JSON.stringify(form.value));
    const value = form.value;
    this.serverService
    .signUpUser(value.fname, value.lname,value.username, value.email, value.password , value.confirmPassword)
    .subscribe(
      (response) => {
        this.ngxService.stop();
        console.log(response);
        this.resp = response;
        console.log( this.resp.username);
       
        
       Swal.fire({title:this.resp.message,
            type:"success",
            showConfirmButton:false,
            timer:2500,
      
      });
        
        if (this.resp.message ){
        this.router.navigate(['/verify', this.resp.username]);}
         this.onClose(); 
        form.reset(); 
        
       

      },
      (error:HttpErrorResponse) => {
        this.ngxService.stop();
        console.log(error);
        this.errorMsg = error.error.message;
        Swal.fire({title:this.errorMsg || "Server Error",
        type:"warning"});

        if(this.errorMsg === "username already exists"){
          form.controls.username.reset() ;
          this.errUsername =  true;
         
           
          
          
          

        }
        if(this.errorMsg === "email is already registered"){
          form.controls.email.reset();
          this.errEmail =  true;
        }
        if(this.errorMsg === "passwords do not match"){
          form.controls.confirmPassword.reset();
          this.errConfirmPassword =  true;
        }
       }

    );
    
      // this.onClose();
    

    

    
   
  }






}
