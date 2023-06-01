import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignupVisible: boolean = false;
  isLoginVisible: boolean = true;

  toggleSignup(event: Event) {
    event.preventDefault(); // Prevent the default behavior of the button click
    
    this.isSignupVisible = !this.isSignupVisible;
    this.isLoginVisible = !this.isLoginVisible; // Toggle the visibility of login and signup
    
    if (this.isSignupVisible) {
      document.body.style.overflow = 'hidden'; // Hide the scrollbars
    } else {
      document.body.style.overflow = ''; // Restore the default scroll behavior
    }
  }
}