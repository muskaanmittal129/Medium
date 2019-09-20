import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { SigninComponent } from '../signin/signin.component';
import { ServerService } from 'src/app/services/server.service';
import { HttpErrorResponse } from '@angular/common/http';





@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.css']
})
export class GetstartedComponent implements OnInit {
  public errorMsg:any;
  
 
  

  constructor(private serverService:ServerService,
    
    private dialog: MatDialog,
    private dialogRef:MatDialogRef<GetstartedComponent>) { }

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
    console.log(JSON.stringify(form.value));
    const value = form.value;
    this.serverService
    .signUpUser(value.fname, value.lname,value.username, value.email, value.password , value.confirmPassword)
    .subscribe(
      (response) => {
        
        console.log(response);
        
        alert("Signup successful. Signin to continue");
       

      },
      (error:HttpErrorResponse) => {
       
        console.log(error);
        this.errorMsg = error.error.message;
        alert(this.errorMsg || "Server Error");
       }

    );
    
      this.onClose();
    

    form.reset(); 

    
   
  }






}
