import { LoginForm } from '../types/auth';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignupVisible: boolean = false;
  isLoading: boolean = false;
  form: LoginForm = {
    username: "",
    password: ""
  };

  constructor(private router: Router, private authService: AuthService) {}

  toggleSignup(event: Event) {
    event.preventDefault();
    this.isSignupVisible = !this.isSignupVisible;
  }

  submit() {
    this.isLoading = true;

    this.authService.login(this.form)
      .then(() => {
        alert('Login successful');
        this.router.navigate(['/']); // Navigate to the desired page after successful login
      })
      .catch((error: any) => {
        alert('Invalid username or password');
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
