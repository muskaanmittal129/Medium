import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  uName:string;
  resend = false;
  resp:any;

  constructor(private serverService:ServerService,
    private route:Router,
    private router:ActivatedRoute) { }

  ngOnInit() {
    this.uName  = this.router.snapshot.params.username;
    setTimeout(() =>{
      this.resend= true;
    }, 120000);

  }

  onResend(){
    this.resend = false;
    setTimeout(() =>{
      this.resend = true;
    }, 120000);
    this.serverService.resendOtp(this.uName)
    .subscribe( 
      (response) => console.log(response),
      (error) => console.log(error),
    );
  }

  onVerify(form:NgForm){ const value = form.value;
    this.serverService
    .verifyOtp(value.otp, this.uName)
    .subscribe(
      (response) => {
        
        console.log(response);
        this.resp = response;
        this.route.navigate(['/home']);},

        (error) => console.log(error)
    );
       
       
        
       

      
    

  }

}
