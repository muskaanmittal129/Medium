import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';

import { ServerService } from '../services/server.service';
import { MatDialog,MatDialogConfig } from '@angular/material';
import { SigninComponent } from '../auth/signin/signin.component';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private serverService:ServerService,
    private dialog: MatDialog,){

  }

  canActivate():boolean{
    if(this.serverService.signedIn()){
      return true;
    }
    else{
      const dialogConfig =  new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = false;
      dialogConfig.width = "60%"; 
      dialogConfig.height = "90%"; 
      this.dialog.open(SigninComponent,dialogConfig)
  
      
    }

  }
 
  
}
