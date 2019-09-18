

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
    constructor(private http:HttpClient){}

        signUpUser(fname:string, lname:string, username:string, email:string, password: string, confirmPassword:string ){
            const headers = new HttpHeaders({'Content-Type':'application/json'})
            console.log(JSON.stringify({fname,lname, username, email,password, confirmPassword}));
            return this.http.post('',JSON.stringify({fname,lname, username, email,password, confirmPassword}),
            {headers:headers});
        }


        signInUser(username:string, password: string){
            const headers = new HttpHeaders({'Content-Type':'application/json'})
            console.log(JSON.stringify({username,password}));
            return this.http.post('',JSON.stringify({username,password}),
            {headers:headers});
        }

        
    }
