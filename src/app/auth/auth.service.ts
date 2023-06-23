import { Injectable } from '@angular/core';
import { LoginForm, SignupForm } from '../types/auth';
import { Auth, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isloading: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  login(form: LoginForm) {
    if (this.isloading) return;
    this.isloading = true;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        this.isAuthenticated = true;
        this.router.navigate(['']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.isAuthenticated = false;
      })
      .finally(() => {
        this.isloading = false;
      });
  }

  signup(form: SignupForm) {
    if (this.isloading) return;
    this.isloading = true;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        this.isAuthenticated = true;
      })
      .catch((error) => {
        this.isAuthenticated = false;
        const errorCode = error.code;
        const errorMessage = error.message;
      })
      .finally(() => {
        this.isloading = false;
      });
  }

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
