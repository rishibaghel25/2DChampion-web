import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLeaderboardVisible: boolean = false;
  isAboutVisible: boolean = false;
  isGamesVisible: boolean = false;
  isLoginVisible: boolean = false;

  toggleLeaderboard() {
    this.isLeaderboardVisible = !this.isLeaderboardVisible;
    this.isAboutVisible = false;
    this.isGamesVisible = false;
    this.isLoginVisible = false;
  }

  toggleAbout() {
    this.isAboutVisible = !this.isAboutVisible;
    this.isLeaderboardVisible = false;
    this.isGamesVisible = false;
    this.isLoginVisible = false;
  }

  toggleLogin() {
    this.isLoginVisible = !this.isLoginVisible;
    this.isLeaderboardVisible = false;
    this.isAboutVisible = false;
    this.isGamesVisible = false;
  }

  toggleGames() {
    this.isGamesVisible = !this.isGamesVisible;
    this.isLeaderboardVisible = false;
    this.isAboutVisible = false;
    this.isLoginVisible = false;
  }
}