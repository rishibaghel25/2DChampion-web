import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(private router: Router) {}

  isLoading: boolean = false; // Add a property to track loading state

  form: { emailOrUsername: string } = {
    emailOrUsername: '',
  };

  sendForgotPasswordEmail(value: any) {
    const database = getDatabase();
    const usersRef = ref(database, 'users');

    const emailQuery = query(usersRef, orderByChild('email'), equalTo(value.emailOrUsername));
    const usernameQuery = query(usersRef, orderByChild('username'), equalTo(value.emailOrUsername));

    this.isLoading = true; // Set isLoading to true when the process starts

    // Check if the provided email or username exists in the database
    get(emailQuery)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          // Send email to the user's email address with the reset password link
          const user = snapshot.val();
          const userEmail = user.email;
          // Your code to send the reset password email goes here

          alert('Reset password email sent to ' + userEmail);
        } else {
          // If the provided value is not an email, check for a username
          get(usernameQuery)
            .then((snapshot: any) => {
              if (snapshot.exists()) {
                // Send email to the user's email address with the reset password link
                const user = snapshot.val();
                const userEmail = user.email;
                // Your code to send the reset password email goes here

                alert('Reset password email sent to ' + userEmail);
              } else {
                alert('No user found with the provided email or username');
              }
              this.isLoading = false; // Set isLoading to false when the process completes or encounters an error
            })
            .catch((error: any) => {
              console.error('Error checking username:', error);
              this.isLoading = false; // Set isLoading to false when the process encounters an error
            });
        }
        this.isLoading = false; // Set isLoading to false when the process completes or encounters an error
      })
      .catch((error: any) => {
        console.error('Error checking email:', error);
        this.isLoading = false; // Set isLoading to false when the process encounters an error
      });
  }
}
