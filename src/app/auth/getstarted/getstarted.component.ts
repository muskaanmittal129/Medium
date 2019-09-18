import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { SigninComponent } from '../signin/signin.component';



@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.css']
})
export class GetstartedComponent implements OnInit {
  

  constructor(private authService:AuthService,
   
    private dialog: MatDialog,
    private dialogRef:MatDialogRef<GetstartedComponent>) { }

  ngOnInit() {
  }


  navigateToSignin(){
    // this.router.navigate(['signin'],{relativeTo:this.route});
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%"; 
    this.dialog.open(SigninComponent,dialogConfig)

  }

  onClose(){
    this.dialogRef.close();
   
  }

  onSignup(form:NgForm){
    console.log(JSON.stringify(form.value));
    const value = form.value;
    this.authService.signUpUser(value.fname, value.lname,value.username, value.email, value.password , value.confirmPassword)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
    );
    this.onClose();

    form.reset();

    
   
  }






}
