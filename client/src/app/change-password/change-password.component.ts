import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthServiceService } from '../services/auth-service.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  resp: any;
  error: any;
  public errorMsg: string;
  public errIncorrectOldP = false;
  public errUnmatched = false;



  constructor(private serverService: ServerService,
    private route: Router,
    private ngxService: NgxUiLoaderService,
    private authService: AuthServiceService,
    private dialogRef:MatDialogRef<ChangePasswordComponent>,
  ) { }

  ngOnInit() {
  }
   
  onClose(){
    this.dialogRef.close();
   
  }


  logoutAllDevices() {
    this.serverService.logoutAllDevices()
      .subscribe(
        (response) => {console.log(response);
          this.authService.loggedOut();},
        (error) => console.log(error),


      );
  }

  logout(){
    this.serverService.logout()
    .subscribe(
      (response) => {console.log(response),
        this.authService.loggedOut();},
      

    
  );
    this.route.navigate(['home']);

  }

  onChangePassword(form: NgForm) {
    this.ngxService.start();
    const value = form.value;
    this.serverService
      .changePassword(value.oldP, value.newP, value.confirmP)
      .subscribe(
        (response) => {this.onClose();
          this.ngxService.stop();
          
          this.resp = response;
          if (this.resp.message) {
            Swal.fire({
              title: 'Do you want to logout from all devices?',
              text: 'This action will log you out from all currently signed in devices.',
              type: 'warning',
              showCancelButton: true,


            }).then((isConfirm) => {
              if (isConfirm.value) {
                this.logoutAllDevices();
              }
              else {
                this.logout();
                this.authService.loggedOut();
              }
            })
            this.route.navigate(['/home']);
          }
        },

        (error) => {
          
          this.ngxService.stop();
          this.error = error
          Swal.fire({
            title: this.error.error.message,
            type: "warning"
          });
          if (this.errorMsg === "Password is incorrect") {
            form.controls.oldP.reset();
            this.errIncorrectOldP = true;






          }
          if (this.errorMsg === "Passwords do not match") {
            form.controls.confirmP.reset();
            this.errUnmatched = true;
          }
        }

      );
  }







}
