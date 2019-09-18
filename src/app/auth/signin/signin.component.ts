import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { GetstartedComponent } from '../getstarted/getstarted.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService:AuthService,
    private dialogRef:MatDialogRef<GetstartedComponent>,
    private dialog: MatDialog) { } 

  ngOnInit() {
  }

  navigateToSignup(){
    // this.router.navigate(['signup'],{relativeTo:this.route});
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"; 
    this.dialog.open(GetstartedComponent,dialogConfig)


  }

  onClose(){
    this.dialogRef.close();
  }

  onSignin(form:NgForm){
    console.log(JSON.stringify(form.value));
    const value = form.value;
    this.authService.signInUser(value.username,value.password )
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
    );
    this.onClose();

    form.reset();

    
   
  }


}
