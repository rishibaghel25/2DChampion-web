import { LoginForm } from '../types/auth';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';

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

  constructor(private router: Router) {}

  toggleSignup(event: Event) {
    event.preventDefault();
    this.isSignupVisible = !this.isSignupVisible;
  }

  submit() {
    this.isLoading = true;
  
    const database = getDatabase();
    const usersRef = ref(database, 'users');
    const usernameQuery = query(usersRef, orderByChild('username'), equalTo(this.form.username));
  
    get(usernameQuery)
      .then((snapshot) => {
        console.log('Snapshot value:', snapshot.val());
        console.log('Form values:', this.form);
        console.log('Form password:', this.form.password);
  
        if (snapshot.exists()) {
          const user = snapshot.val();
          const userId = Object.keys(user)[0]; // Get the user ID
          const userData = user[userId]; // Get the user data object
  
          console.log('User password type:', typeof userData.password);
          console.log('Form password type:', typeof this.form.password);
  
          if (userData.password === this.form.password) {
            alert('Login successful');
            this.router.navigate(['/']); // Navigate to the desired page after successful login
          } else {
            alert('Invalid username or password');
          }
        } else {
          alert('Invalid username or password');
        }
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error during login:', error);
        this.isLoading = false;
      });
  }
}  