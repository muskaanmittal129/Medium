import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { HomeBlogDetailsComponent } from './home/home-blog-details/home-blog-details.component';
import { SigninComponent } from './auth/signin/signin.component';
import { GetstartedComponent } from './auth/getstarted/getstarted.component';
import { AuthGuard } from './guard/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';







const routes: Routes = [
  {path:'', component:WelcomeComponent}, 

  
  {path:'home', component:HomeComponent}, 
  
    {path:'description/:id', component:HomeBlogDetailsComponent
  },
 
 
  {path:'create',component:CreateComponent, canActivate:[AuthGuard]},
  {path:'myProfile',component:UserProfileComponent, canActivate:[AuthGuard]},
  {path:'edit/:blogID',component:EditBlogComponent}, 
   
  {path:'verify/:username', component:VerifyOtpComponent}, 
   
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
