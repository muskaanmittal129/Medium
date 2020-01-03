import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  signedIn(){
    return !!localStorage.getItem('token');
}

getToken(){
    return localStorage.getItem('token')  
}
getUsername(){
    return localStorage.getItem('username')  
}





loggedOut(){
  localStorage.removeItem('token')
}



}
