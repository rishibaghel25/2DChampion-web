import { Component } from '@angular/core';
import { LoginForm } from '../types/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignupVisible: boolean = false;
  username: string='';
  form: LoginForm={
    username:'',
    password:'',
  };



  toggleSignup(event: Event) {
    
    this.isSignupVisible = !this.isSignupVisible;
   
  }
  submit(){
    console.log(this.form)
  }
}