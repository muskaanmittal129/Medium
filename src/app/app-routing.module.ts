import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { HomeBlogDetailsComponent } from './home/home-blog-details/home-blog-details.component';
import { NewComponent } from './home/new/new.component';





const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent, children:[
    {path:':id', component:HomeBlogDetailsComponent
  },
 
  ]},
  {path:'create',component:CreateComponent}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
