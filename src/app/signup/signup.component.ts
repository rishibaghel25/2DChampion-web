import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoginVisible: boolean = false;
  isLeaderboardVisible: boolean = false;
  isAboutVisible: boolean = false;
  isGamesVisible: boolean = false;
  toggleLogin() {
    this.isLoginVisible = !this.isLoginVisible;
    this.isLeaderboardVisible = false;
    this.isGamesVisible = false;
    this.isAboutVisible = false;

  }

}
