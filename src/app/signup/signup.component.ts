import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupForm } from '../types/auth';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoginVisible: boolean = false;

  constructor(private authService: AuthService) {}

  toggleLogin(event: Event) {
    event.preventDefault();
    this.isLoginVisible = !this.isLoginVisible;
  }

  form: SignupForm = {
    name: '',
    username: '',
    email: '',
    password: '',
  };

  submit() {
    this.authService.signup(this.form);
  }

  isLoading() {
    return this.authService.isloading;
  }
}
