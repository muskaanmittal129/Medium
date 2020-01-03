import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-username-change',
  templateUrl: './username-change.component.html',
  styleUrls: ['./username-change.component.css']
})
export class UsernameChangeComponent implements OnInit {
  resp:any;
  error:any;
  errorMsg:any;
  @ViewChild('f', {static: false}) form:NgForm;
  constructor(private serverService:ServerService,
    private route:Router,
    private ngxService: NgxUiLoaderService,
    private dialogRef:MatDialogRef<UsernameChangeComponent>,) { }

  ngOnInit() {
    this.serverService.getUsername()
    .subscribe(
      (response) => {console.log(response);
        this.resp  = response;
      this.form.setValue({
        username:this.resp.username,
        });
      
      },);
  }
  onClose(){
    this.dialogRef.close();
   
  }
  onChangeUsername(form:NgForm){
    this.ngxService.start();
    const value = form.value;
    this.serverService
    .changeUsername(value.username )
    .subscribe(
      (response) =>{
        this.ngxService.stop();
        console.log(response);
        this.resp = response;
        if(this.resp){ this.onClose();
          form.reset();}
        
          Swal.fire({title:this.resp.message,
            type:"success",});
        this.route.navigate(['/home']);},

        (error) => {console.log(error) 
          this.ngxService.stop();
          this.error= error
          Swal.fire({title:this.error.error.message,
           type:"warning"});
         
            
           
             
            
            
            
  
          
         
          }

    );}

}


