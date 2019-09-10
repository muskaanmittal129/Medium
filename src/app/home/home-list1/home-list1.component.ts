import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../blog.model';



@Component({
  selector: 'app-home-list1',
  templateUrl: './home-list1.component.html',
  styleUrls: ['./home-list1.component.css']
})
export class HomeList1Component implements OnInit {
  @Input() blog:Blog;
@Input() index:number; 

  constructor() { }

  ngOnInit() {
  }

}





 
