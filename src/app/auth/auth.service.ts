import { Injectable } from '@angular/core';
import { LoginForm, SignupForm } from '../types/auth';
import { Auth, getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isloading: boolean = false;
  isAuthenticated: boolean = false;
  isLoading(): boolean {
    return this.isloading;
  }
  constructor(private router: Router) {}

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.isAuthenticated = false;
        this.router.navigate(['login']);
      })
      .catch((error) => {
        // An error happened.
      });
  }
}
