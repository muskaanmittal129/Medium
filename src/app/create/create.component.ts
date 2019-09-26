import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
   res:any;
  constructor(private serverService: ServerService,
    private router:Router) { }

  ngOnInit() {
  }


  onCreate(form: NgForm) {
    
   
    console.log(form.value);
    const value = form.value;
    this.serverService
      .createBlog(value.title, value.subTitle, value.imagePath, value.content, value.category)
      .subscribe(
        (response) => { 
          console.log(response);
          this.res = response
          if(this.res.message === "blog created successfully"){
            this.router.navigate(['home']);

          }

         },

        (error: HttpErrorResponse) => {
          console.log(error);
        }



      );









  }


  onCancel(){
    this.router.navigate(['home']);
  }

}


