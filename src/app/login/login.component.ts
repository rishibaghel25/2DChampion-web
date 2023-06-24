import { Component } from '@angular/core';
import { LoginForm } from '../types/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignupVisible: boolean = false;
  email: string='';
  form: LoginForm={
    email: '',
    password: ''
  };

  toggleSignup(event: Event) {
    
    this.isSignupVisible = !this.isSignupVisible;
   
  }
  constructor(private authService: AuthService){}
  submit(){
this.authService.login(this.form)
alert("Login Completed");
  }
  isLoading(){
    return this.authService.isloading;
  }
  isAuthenticated(){
    return this.authService.isAuthenticated;
  }
}