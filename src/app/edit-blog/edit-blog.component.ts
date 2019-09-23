import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  constructor(private serverService:ServerService,) { }

  ngOnInit() {
    this.serverService.editBlog()
    .subscribe(
      (response) => {
        console.log(response);
       
  },
  (error) => console.log(error)
    );
}

}
