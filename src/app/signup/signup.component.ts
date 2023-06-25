import { SignupForm } from '../types/auth';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { getDatabase, ref, query, orderByChild, equalTo, get, push, set } from 'firebase/database';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isLoginVisible: boolean = false;
  isLoading: boolean = false; // Add a property to track loading state

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

  signupUser(value: any) {
    const database = getDatabase();
    const usersRef = ref(database, 'users');
    const emailQuery = query(usersRef, orderByChild('email'), equalTo(value.email));
    const usernameQuery = query(usersRef, orderByChild('username'), equalTo(value.username));

    this.isLoading = true; // Set isLoading to true when signup process starts

    get(emailQuery).then((snapshot: any) => {
      if (snapshot.exists()) {
        // Email already exists
        alert('Email already exists');
        this.isLoading = false; // Set isLoading to false when the process completes or encounters an error
      } else {
        get(usernameQuery).then((snapshot: any) => {
          if (snapshot.exists()) {
            // Username already exists
            alert('Username already exists');
            this.isLoading = false; // Set isLoading to false when the process completes or encounters an error
          } else {
            // All fields are valid, proceed with signup
            const newUserId = this.generateNumericId(); // Generate a numeric ID
            const newUserRef = push(usersRef);
            const newUserKey = newUserRef.key as string;

            set(ref(database, 'users/' + newUserId), {
              name: value.name,
              username: value.username,
              email: value.email,
              password: value.password,
            }).then(() => {
              alert('Signup successful');
              this.router.navigate(['/login']); // Optional navigation after successful signup
              this.isLoading = false; // Set isLoading to false when the process completes
            }).catch((error: any) => {
              console.error('Error creating user:', error);
              this.isLoading = false; // Set isLoading to false when the process encounters an error
            });
          }
        });
      }
    });
  }

  // Function to generate numeric IDs
  private counter = 0;

  generateNumericId(): string {
    this.counter++;
    return this.counter.toString();
  }
}
