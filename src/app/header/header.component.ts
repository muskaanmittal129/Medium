import { Component, OnInit } from '@angular/core';
import{MatDialog, MatDialogConfig} from '@angular/material';
import { GetstartedComponent } from '../auth/getstarted/getstarted.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { AuthServiceService } from '../services/auth-service.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  

  constructor(private dialog: MatDialog,
 
    private authService:AuthServiceService,) { }

  ngOnInit() {
  }

  onClickSignup(){
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose =false;
    dialogConfig.autoFocus = false;
    
    dialogConfig.width = "60%"; 
    dialogConfig.height = "90%"; 
    this.dialog.open(GetstartedComponent,dialogConfig,)

  }

  onClickSignin(){
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%"; 
    dialogConfig.height = "90%"; 
    this.dialog.open(SigninComponent,dialogConfig)

  }

  


}
