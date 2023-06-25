import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';
import { AuthService } from './auth/auth.service';
import { Database, set, ref, update} from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, public database: Database) {}
  title='2D Champion'
  ngOnInit(): void {
    initializeApp(firebaseConfig);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  signup(value: any ){

    set(ref(this.database, 'users/' + value.username), {
      name:value.name,
      username: value.username,
      email: value.email,
      
  });
  alert('value stored');
  }
}