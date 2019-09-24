import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';


import { BlogService } from './home/blog.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CreateComponent } from './create/create.component';
import { FooterComponent } from './footer/footer.component';
import { HomeBlogDetailsComponent } from './home/home-blog-details/home-blog-details.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { GetstartedComponent } from './auth/getstarted/getstarted.component';
import{ FormsModule} from '@angular/forms';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';

import { CommonModule } from '@angular/common';
import * as  Material from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule, MatDialogContent} from '@angular/material/dialog';
import { ServerService } from './services/server.service';
import { AuthGuard } from './guard/auth.guard';
// import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthServiceService } from './services/auth-service.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
// import { NgxEditorModule } from 'ngx-editor';

// import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';













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
    WelcomeComponent,
    UserProfileComponent,
    EditBlogComponent,
    DeleteBlogComponent,
    VerifyOtpComponent,
   
    
   
  ],

    
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    Material.MatDialogModule,
    BrowserAnimationsModule,
    MatDialogModule,
    // NgxEditorModule,
    // AngularFontAwesomeModule,
    // TooltipModule.forRoot()
   

    
    
 
  ],

  providers: [BlogService, ServerService,AuthGuard,AuthServiceService,
    // {provide: HTTP_INTERCEPTORS,
    //   useClass:TokenInterceptorService,
    //   multi:true}

  ],
    
   
 
  bootstrap: [AppComponent],
  entryComponents:[GetstartedComponent, SigninComponent],  
})
    
    
   
    
    
    
    
    
  
  
 

export class AppModule { }
