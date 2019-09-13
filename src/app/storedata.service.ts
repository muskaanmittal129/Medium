import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogService } from './home/blog.service';

@Injectable()


export class dataStorage{
    constructor(private http: HttpClient,
        private blogService:BlogService){

    }



    getServer(){
    const api_call =  this.http.get
    ('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=8f6e7eafbcaceee6b0fd1759888a64c7')
    

    console.log(api_call);
    }
}