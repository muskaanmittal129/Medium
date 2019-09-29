import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
   res:any;
  constructor(private serverService: ServerService,
    private router:Router,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
  }


  onCreate(form: NgForm) {
    this.ngxService.start();
   
    console.log(form.value);
    const value = form.value;
    this.serverService
      .createBlog(value.title, value.subTitle, value.imagePath, value.content, value.category)
      .subscribe(
        (response) => { 
          this.ngxService.stop();
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

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
};


}


