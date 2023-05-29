import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignupVisible: boolean = false;

  toggleSignup() {
    this.isSignupVisible = !this.isSignupVisible;
  }
}
