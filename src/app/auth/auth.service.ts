// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getDatabase, ref, query, orderByChild, equalTo, get, DataSnapshot, set } from 'firebase/database';
interface LoginForm {
  username: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  username: string = '';

  constructor(private router: Router) {}

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }

  getHighScore(userId: string): Promise<number> {
    const database = getDatabase();
    const highScoreRef = ref(database, `HighScore/${userId}/SnakeGameHighScore`);

    return get(highScoreRef).then((snapshot: DataSnapshot) => {
      return snapshot.val();
    });
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

            return; // No need to initialize high score here
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

  storeHighScore(userId: string, highScore: number): Promise<void> {
    const database = getDatabase();
    const highScoreRef = ref(database, `HighScore/${userId}/SnakeGameHighScore`);

    return set(highScoreRef, highScore);
  }
}
