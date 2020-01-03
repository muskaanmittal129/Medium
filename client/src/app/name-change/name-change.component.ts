import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-name-change',
  templateUrl: './name-change.component.html',
  styleUrls: ['./name-change.component.css']
})
export class NameChangeComponent implements OnInit {
resp:any;
error:any;
errorMsg:any;
@ViewChild('f', {static: false}) form:NgForm;
  constructor(private serverService:ServerService,
    private route:Router,
    private ngxService: NgxUiLoaderService,
    private dialogRef:MatDialogRef<NameChangeComponent>,) { }

  ngOnInit() {
    this.serverService.getName()
    .subscribe(
      (response) => {console.log(response);
        this.resp  = response;
      this.form.setValue({
        fname:this.resp.fname,
        lname:this.resp.lname,});
      
      },);}
  
  onClose(){
    this.dialogRef.close();
   
  }

  onChangeName(form:NgForm){ 
    this.ngxService.start();
    const value = form.value;
    this.serverService
    .changeName(value.fname, value.lname, )
    .subscribe(
      (response) => {
        this.ngxService.stop();
        console.log(response);
        this.resp = response;
        if(this.resp){ this.onClose();
          form.reset();}
          Swal.fire({title:this.resp.message,
            type:"success",});
        this.route.navigate(['/home']);},

        (error) => {console.log(error) 
          this.error= error
          Swal.fire({title:this.error.error.message,
           type:"warning"});
          if(this.errorMsg === "Password is incorrect"){
            form.controls.oldP.reset() ;}
            
           
             
            
            
            
  
          
         
          }

    );}


}



    

  


