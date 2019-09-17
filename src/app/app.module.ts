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




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    HomeComponent,
    
    CreateComponent,
    FooterComponent,
    HomeBlogDetailsComponent,
    AuthComponent,
   
  ],

    
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],

  providers: [BlogService, dataStorage],

  bootstrap: [AppComponent],
})
    
    
   
    
    
    
    
    
  
  
 

export class AppModule { }
