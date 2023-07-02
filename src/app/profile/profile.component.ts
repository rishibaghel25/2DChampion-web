import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: string = '';
  username: string = '';
  email: string = '';
  profilePic: string = '';
  highscore: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const username = this.authService.getUsername();
    this.authService.getCurrentUser(username)
      .then((user: any) => {
        this.name = user.name;
        this.username = user.username;
        this.email = user.email;
        this.profilePic = user.profilePic;
        this.highscore = user.highscore;
      })
      .catch((error: any) => {
        console.log('Error retrieving user information:', error);
      });
  }
}
