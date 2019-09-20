import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { GetstartedComponent } from '../getstarted/getstarted.component';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  tk :any;

  constructor(private serverService:ServerService,
    private dialogRef:MatDialogRef<GetstartedComponent>,
    private dialog: MatDialog) { } 

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
      response => {console.log(response);
        this.tk = response;
        localStorage.setItem('token', this.tk.token)
        alert("Signin Successful");},


      (error) => {console.log(error),
        alert("Invalid Inputs. Login again");},
    );
    this.onClose();

    form.reset();

    
   
  }


}
