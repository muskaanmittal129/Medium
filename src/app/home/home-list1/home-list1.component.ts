import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../blog.model';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-home-list1',
  templateUrl: './home-list1.component.html',
  styleUrls: ['./home-list1.component.css']
})
export class HomeList1Component implements OnInit {
  @Input() blog:Blog;
@Input() index:number; 

  constructor(  private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
  }
  // navigateToDetailComp(){
  //   this.router.navigate(['new'],{relativeTo:this.route})
  // }

}





 
