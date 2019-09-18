import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';


import { BlogService } from './home/blog.service';
import { HttpClientModule } from '@angular/common/http';
import { dataStorage } from './storedata.service';
import { CreateComponent } from './create/create.component';
import { FooterComponent } from './footer/footer.component';
import { HomeBlogDetailsComponent } from './home/home-blog-details/home-blog-details.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { GetstartedComponent } from './auth/getstarted/getstarted.component';
import{ FormsModule} from '@angular/forms';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import * as  Material from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from '@angular/material'; 
// import {MdButtonModule, MdCheckboxModule} from '@angular/material';   
// import {MdCardModule} from '@angular/material';








@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
    HomeComponent,
    
    CreateComponent,
    FooterComponent,
    HomeBlogDetailsComponent,
    AuthComponent,
    SigninComponent,
    GetstartedComponent,
    ConfirmEqualValidatorDirective,
    
   
  ],

    
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    Material.MatDialogModule,
    BrowserAnimationsModule,
    // MaterialModule,
    // MdButtonModule,
    // MdCheckboxModule,
    // MdCardModule,
 
  ],

  providers: [BlogService, dataStorage, AuthService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }, ],

  bootstrap: [AppComponent],
  entryComponents:[GetstartedComponent, SigninComponent],
})
    
    
   
    
    
    
    
    
  
  
 

export class AppModule { }
