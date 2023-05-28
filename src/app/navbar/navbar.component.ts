import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLeaderboardVisible: boolean = false;
  isAnimationVisible: boolean = true;
  isGamesVisible: boolean = false;

  toggleLeaderboard() {
    this.isLeaderboardVisible = !this.isLeaderboardVisible;
    this.isAnimationVisible = false;
    this.isGamesVisible = false;
  }

  toggleAnimation() {
    this.isAnimationVisible = !this.isAnimationVisible;
    this.isLeaderboardVisible = false;
    this.isGamesVisible = false;
  }

  toggleGames() {
    this.isGamesVisible = !this.isGamesVisible;
    this.isLeaderboardVisible = false;
    this.isAnimationVisible = false;
  }
}