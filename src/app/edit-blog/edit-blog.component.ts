import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../home/blog.service';
import { Blog } from '../home/blog.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  id: number;
  res: any;
  bTitle: string;
  bSubTitle: string;
  bContent: string;
  bImagePath: string;
  blogs: any;
  blogID: any;

  @ViewChild('f', {static: false}) form:NgForm;
  constructor(private serverService: ServerService,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router) { }

  ngOnInit() {
     this.blogID = this.route.snapshot.params.blogID;
     console.log(this.blogID);
    // this.route.params.subscribe(
    //   params => {
    //     this.id = +params[''];
    //     console.log(this.id);
        
    //   }
    // );

   
   
    this.serverService.editBlog(this.blogID)
      .subscribe(

        (response) => {
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
        (error) => console.log(error)
      );
  }

  onEdit(form: NgForm) {


    const value = form.value;
    console.log(value);
    this.serverService.postEditBlog(value.title, value.subTitle, value.imagePath, value.content, value.category, this.blogID)
      .subscribe(
        (response) => {
          console.log(response);
          this.res = response;
          if (this.res.message === 'Updated successfully') {
            this.router.navigate(['myProfile']);
          }
        },
        (error) => console.log(error),


      );

  }

  onCancel(){
    this.router.navigate(['myProfile']);
  }

}
