import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, query, orderByChild, limitToFirst, get, DataSnapshot } from 'firebase/database';

interface Player {
  rank: number;
  username: string;
  score: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  dailyLeaderboard: Player[] = [];
  weeklyLeaderboard: Player[] = [];
  monthlyLeaderboard: Player[] = [];

  ngOnInit() {
    this.loadLeaderboardData();
  }

  loadLeaderboardData() {
    const database = getDatabase();

    // Load daily leaderboard
    const dailyLeaderboardRef = query(
      ref(database, 'DailyLeaderboard'),
      orderByChild('score'),
      limitToFirst(12)
    );
    get(dailyLeaderboardRef)
      .then((snapshot: DataSnapshot) => {
        this.dailyLeaderboard = this.parseLeaderboardData(snapshot);
      })
      .catch((error: any) => {
        console.error('Error loading daily leaderboard:', error);
      });

    // Load weekly leaderboard
    const weeklyLeaderboardRef = query(
      ref(database, 'WeeklyLeaderboard'),
      orderByChild('score'),
      limitToFirst(12)
    );
    get(weeklyLeaderboardRef)
      .then((snapshot: DataSnapshot) => {
        this.weeklyLeaderboard = this.parseLeaderboardData(snapshot);
      })
      .catch((error: any) => {
        console.error('Error loading weekly leaderboard:', error);
      });

    // Load monthly leaderboard
    const monthlyLeaderboardRef = query(
      ref(database, 'MonthlyLeaderboard'),
      orderByChild('score'),
      limitToFirst(12)
    );
    get(monthlyLeaderboardRef)
      .then((snapshot: DataSnapshot) => {
        this.monthlyLeaderboard = this.parseLeaderboardData(snapshot);
      })
      .catch((error: any) => {
        console.error('Error loading monthly leaderboard:', error);
      });
  }

  parseLeaderboardData(snapshot: DataSnapshot): Player[] {
    const leaderboard: Player[] = [];

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot: DataSnapshot) => {
        const playerData = childSnapshot.val();
        const player: Player = {
          rank: leaderboard.length + 1,
          username: playerData.username,
          score: playerData.score
        };
        leaderboard.push(player);
      });
    }

    return leaderboard;
  }
}
