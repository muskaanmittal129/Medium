

import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class ServerService{
    private rootUrl = "https://8497d281.ngrok.io";
    body:{};


    constructor(private http:HttpClient,
        private injector:Injector){}

        signUpUser(fname:string, lname:string, username:string, email:string, password: string, confirmPassword:string ){
            const headers = new HttpHeaders({'Content-Type':'application/json'})
            console.log(JSON.stringify({fname,lname, username, email,password, confirmPassword}));
            return this.http.post(this.rootUrl+'/signup',JSON.stringify({fname,lname, username, email,password, confirmPassword}),
            {headers:headers});
            // .catch(this.errorHandler);
            
        }


        signInUser(username:string, password: string){
            const headers = new HttpHeaders({'Content-Type':'application/json'})
            console.log(JSON.stringify({username,password}));
            return this.http.post(this.rootUrl+'/signin',JSON.stringify({username,password}),
            {headers:headers}); 
        }

        // errorHandler(error:HttpErrorResponse){
        //     return Observable.throw(error.message || "Server Error")
        //   }

        createBlog(title:string, subTitle:string, imagePath:string, content:string, category: string ){
            let authService = this.injector.get(AuthServiceService)
            const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${authService.getToken()}`});
     
            console.log(JSON.stringify({title,subTitle,imagePath,content,category}));
            return this.http.post(this.rootUrl+'/blog/create',JSON.stringify({title,subTitle,imagePath,content,category}),
            {headers:headers});
            
            
        }

        getCreateBlog(){
            return this.http.get(this.rootUrl+'/home');
        }

        getMyBlogs(){
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+token,

            })
            return this.http.get(this.rootUrl+'/user', {headers:headers});

        }

        editBlog(blogID:number){ const token = localStorage.getItem('token');
        
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+token,

        })
        return this.http.get(this.rootUrl+'/blog/edit/'+blogID, {headers:headers})
        
        

        }

        postEditBlog(title:string, subTitle:string, imagePath:string, content:string, category: string, blogID:number )
        { const token = localStorage.getItem('token');
        
        console.log(blogID);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+token,

        })
        return this.http.post(this.rootUrl+'/blog/edit/'+blogID,JSON.stringify({title,subTitle,imagePath,content,category}),
         {headers:headers})
        
        

        }

        DeleteBlog( blogID:number)
        {  

            const token = localStorage.getItem('token');
            const headers = new HttpHeaders({
            'Content-Type': 'application/json;charset= UTF-8;',
            'Authorization': `Bearer `+token,
            
        })
        console.log(headers);
        
        return this.http.post(this.rootUrl+'/blog/delete/'+blogID, this.body,
         {headers:headers})
        
        

        }

        verifyOtp(otp:number, username:string){
            const headers = new HttpHeaders({'Content-Type': 'application/json'})
            console.log(username)
            return this.http.post(this.rootUrl+'/check-otp/'+username,
            JSON.stringify({otp}),
            {headers:headers});
        }

        resendOtp(username:string){
            const headers = new HttpHeaders({'Content-Type': 'application/json'})
            return this.http.post(this.rootUrl+'/resend-otp/'+username,
            
            {headers:headers});
            
        }




       


       

        
    }
