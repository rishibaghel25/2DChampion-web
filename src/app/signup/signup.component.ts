import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupForm } from '../types/auth';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoginVisible: boolean = false;

  toggleLogin(event: Event) {
    event.preventDefault(); // Prevent the default behavior of the button click
    
    this.isLoginVisible = !this.isLoginVisible;
   
  }
  form: SignupForm={
    name:'',
    username:'',
    email:'',
    password:'',
  };
  submit(){
    console.log(this.form)
  }

}
