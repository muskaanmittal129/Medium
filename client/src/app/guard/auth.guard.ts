import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';


import { MatDialog,MatDialogConfig } from '@angular/material';
import { SigninComponent } from '../auth/signin/signin.component';
import { AuthServiceService } from '../services/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthServiceService,
    private dialog: MatDialog,){

  }

  canActivate():boolean{
    if(this.authService.signedIn()){
      return true;
    }
    else{
      const dialogConfig =  new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = false;
      dialogConfig.width = "60%"; 
      dialogConfig.height = "90%"; 
      this.dialog.open(SigninComponent,dialogConfig);
      return false;
  
      
    }

  }
 
  
}
