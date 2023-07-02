import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLeaderboardVisible: boolean = false;
  isAboutVisible: boolean = false;
  isGamesVisible: boolean = false;
  isProfileVisible: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Initialize any necessary code or configuration
  }

  logout(): void {
    this.authService.logout();
  }

  toggleLeaderboard(): void {
    this.isLeaderboardVisible = !this.isLeaderboardVisible;
    this.isAboutVisible = false;
    this.isGamesVisible = false;
  }

  toggleAbout(): void {
    this.isAboutVisible = !this.isAboutVisible;
    this.isLeaderboardVisible = false;
    this.isGamesVisible = false;
  }

  toggleGames(): void {
    this.isGamesVisible = !this.isGamesVisible;
    this.isLeaderboardVisible = false;
    this.isAboutVisible = false;
  }
  
  toggleProfile(): void {
    this.isProfileVisible = !this.isProfileVisible;
    this.isLeaderboardVisible = false;
    this.isAboutVisible = false;
  }
}
