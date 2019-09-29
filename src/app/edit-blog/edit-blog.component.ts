import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  id: number;
  res: any;
  blogs: any;
  blogID: any;

  @ViewChild('f', {static: false}) form:NgForm;
  constructor(private serverService: ServerService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private router: Router,) { }

  ngOnInit() {this.ngxService.start(); 
     this.blogID = this.route.snapshot.params.blogID; 
     console.log(this.blogID);
   

   
   
    this.serverService.editBlog(this.blogID)
      .subscribe(

        (response) => {this.ngxService.stop(); 
          this.res = response;
          console.log(this.res.blog);
          
         

          
          this.form.setValue({
            title:this.res.blog.title,
            subTitle:this.res.blog.subTitle,
            imagePath:this.res.blog.imagePath,
            content:this.res.blog.content,
            category:this.res.blog.category,

          })

         



        },
       
      );
  }

  onEdit(form: NgForm) {
    this.ngxService.start();

    const value = form.value;
    console.log(value);
    this.serverService.postEditBlog(value.title, value.subTitle, value.imagePath, value.content, value.category, this.blogID)
      .subscribe(
        (response) => {
          console.log(response);
          this.res = response;
          if (this.res.message === 'Updated successfully') {
            this.ngxService.stop();
            this.router.navigate(['myProfile']);
          }
        },
        (error) => console.log(error),


      );

  }

  onCancel(){
    this.router.navigate(['myProfile']);
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
