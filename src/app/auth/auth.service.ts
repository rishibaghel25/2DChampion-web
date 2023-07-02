import { Injectable } from '@angular/core';
import { LoginForm } from '../types/auth';
import { Router } from '@angular/router';
import { getDatabase, ref, query, orderByChild, equalTo, get, DataSnapshot } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  username: string = ''; // Add a property to store the logged-in username

  constructor(private router: Router) {}

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  login(loginForm: LoginForm): Promise<void> {
    this.isAuthenticated = false;

    const database = getDatabase();
    const usersRef = ref(database, 'users');
    const usernameQuery = query(usersRef, orderByChild('username'), equalTo(loginForm.username));

    return get(usernameQuery)
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const user = snapshot.val();
          const userId = Object.keys(user)[0];
          const userData = user[userId];
          if (userData.password === loginForm.password) {
            this.isAuthenticated = true;
            this.setUsername(userData.username); // Set the logged-in username
            return;
          }
        }

        throw new Error('Invalid username or password');
      })
      .catch((error: any) => {
        console.error('Error during login:', error);
        throw error;
      });
  }

  getCurrentUser(username: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const database = getDatabase();
      const usersRef = ref(database, 'users');
      const queryRef: any = query(usersRef, orderByChild('username'), equalTo(username));

      get(queryRef)
        .then((snapshot: DataSnapshot) => {
          if (snapshot.exists()) {
            const user = snapshot.val();
            const userId = Object.keys(user)[0];
            const userData = user[userId];
            resolve(userData);
          } else {
            reject('User not found');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
