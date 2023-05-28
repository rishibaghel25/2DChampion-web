import { Component } from '@angular/core';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  isLeaderboardVisible: boolean = false;

  showLeaderboard() {  // method implementation.
    this.isLeaderboardVisible = !this.isLeaderboardVisible;
  }
}