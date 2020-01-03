import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  resp:any;
  error:any;
  errorMsg:any;
  @ViewChild('f', {static: false}) form:NgForm;
  constructor(private serverService:ServerService,
    private router:Router,
    private ngxService: NgxUiLoaderService,
    private authService:AuthServiceService,
    private dialogRef:MatDialogRef<ChangeEmailComponent>,) { }

  ngOnInit() { 
    this.serverService.getEmail()
    .subscribe(
      (response) => {console.log(response);
        this.resp  = response;
      this.form.setValue({
        email:this.resp.email,
        });
      
      },);
  }
  onClose(){
    this.dialogRef.close();
   
  }

  onChangeEmail(form:NgForm){
   
    this.ngxService.start();
    const value = form.value;
    this.serverService
    .changeEmail(value.email )
    .subscribe(
      (response) => {
        this.ngxService.stop();
        
        this.resp = response; 
        if(this.resp){ this.onClose();
          form.reset();}
        
        Swal.fire({title:this.resp.message,
          type:"success",});
        if (this.resp.message ){
          
            form.reset(); 
          this.router.navigate(['/verify', this.resp.username]);
          this.authService.loggedOut();
           
          
        }
         
  
        },
        
         

        (error) => {
          this.ngxService.stop();
          this.error= error
          Swal.fire({title:this.error.error.message,
           type:"warning"});
           
         
            
           
             
            
            
            
  
          
         
          }

    );}

}





