import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { GetstartedComponent } from '../auth/getstarted/getstarted.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { BlogService } from '../home/blog.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import Swal from 'sweetalert2';
import { ServerService } from '../services/server.service';
import { NameChangeComponent } from '../name-change/name-change.component';
import { UsernameChangeComponent } from '../username-change/username-change.component';
import { ChangeEmailComponent } from '../change-email/change-email.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  extractUser: string;
  @Input() usname: string;



  constructor(private dialog: MatDialog,
    private serverService: ServerService,
    private authService: AuthServiceService,
    private router: Router,
    private blogService: BlogService,
    private ngxService: NgxUiLoaderService


  ) { }

  ngOnInit() {

  }

  onClickSignup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.width = "60%";
    dialogConfig.height = "90%";
    this.dialog.open(GetstartedComponent, dialogConfig);


  }

  onClickSignin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    dialogConfig.height = "90%";
    this.dialog.open(SigninComponent, dialogConfig);


  }

  toHomePage() {this.ngxService.start(); 
    this.serverService.logout()
    .subscribe(
      (response) => {console.log(response),
        this.ngxService.stop(); 
        this.authService.loggedOut();}, 
      (error) => {console.log(error),
        this.ngxService.stop(); },

    
  );
    this.router.navigate(['home']);


  }

  onChangeP() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.width = "60%";
    dialogConfig.height = "90%";
    this.dialog.open(ChangePasswordComponent, dialogConfig)
  }

  onChangeN() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.width = "60%";
    dialogConfig.height = "90%";
    this.dialog.open(NameChangeComponent, dialogConfig)
  }

  onChangeU() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.width = "60%";
    dialogConfig.height = "90%";
    this.dialog.open(UsernameChangeComponent, dialogConfig)
  }

  onChangeE() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.width = "60%";
    dialogConfig.height = "90%";
    this.dialog.open(ChangeEmailComponent, dialogConfig)
  }


  deleteProfile() {
    this.serverService.DeleteProfile()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error),


      );
  }
  onDeleteProfile() {
    Swal.fire({
      title: 'Delete Account?',
      text: 'Are you sure you want to delete your account?',
      type: 'warning',
      showCancelButton: true,


    }).then((isConfirm) => {
      if (isConfirm.value) {
        this.deleteProfile();
        this.authService.loggedOut();
      }
      

    })
  }



}
