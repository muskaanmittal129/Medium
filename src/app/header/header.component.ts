import { Component, OnInit, Input } from '@angular/core';
import{MatDialog, MatDialogConfig} from '@angular/material';
import { GetstartedComponent } from '../auth/getstarted/getstarted.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { BlogService } from '../home/blog.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  extractUser:string;
  @Input() usname:string;
 


  constructor(private dialog: MatDialog,
 
    private authService:AuthServiceService,
    private router:Router,
    private blogService:BlogService) { }

  ngOnInit() {
  
  }
  
  onClickSignup(){
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose =false;
    dialogConfig.autoFocus = false;
    
    dialogConfig.width = "60%"; 
    dialogConfig.height = "90%"; 
    this.dialog.open(GetstartedComponent,dialogConfig,);
    

  }

  onClickSignin(){
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%"; 
    dialogConfig.height = "90%"; 
    this.dialog.open(SigninComponent,dialogConfig);
   

  }

  toHomePage(){
    this.router.navigate(['home']);
    

  }




}
