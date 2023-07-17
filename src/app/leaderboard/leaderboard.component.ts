import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, query, orderByChild, limitToFirst, get, DataSnapshot } from 'firebase/database';

interface Player {
  rank: number;
  username: string | null; // Update here to allow null values
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
      ref(database, 'HighScore'),
      orderByChild('SnakeGameHighScore'),
      limitToFirst(10)
    );
    get(dailyLeaderboardRef)
      .then((snapshot: DataSnapshot) => {
        this.parseLeaderboardData(snapshot, 'desc')
          .then((leaderboard: Player[]) => {
            this.dailyLeaderboard = leaderboard;
          })
          .catch((error: any) => {
            console.error('Error loading daily leaderboard:', error);
          });
      })
      .catch((error: any) => {
        console.error('Error loading daily leaderboard:', error);
      });

    // Load weekly leaderboard
    const weeklyLeaderboardRef = query(
      ref(database, 'HighScore'),
      orderByChild('SnakeGameHighScore'),
      limitToFirst(10)
    );
    get(weeklyLeaderboardRef)
      .then((snapshot: DataSnapshot) => {
        this.parseLeaderboardData(snapshot, 'desc')
          .then((leaderboard: Player[]) => {
            this.weeklyLeaderboard = leaderboard;
          })
          .catch((error: any) => {
            console.error('Error loading weekly leaderboard:', error);
          });
      })
      .catch((error: any) => {
        console.error('Error loading weekly leaderboard:', error);
      });

    // Load monthly leaderboard
    const monthlyLeaderboardRef = query(
      ref(database, 'HighScore'),
      orderByChild('SnakeGameHighScore'),
      limitToFirst(10)
    );
    get(monthlyLeaderboardRef)
      .then((snapshot: DataSnapshot) => {
        this.parseLeaderboardData(snapshot, 'desc')
          .then((leaderboard: Player[]) => {
            this.monthlyLeaderboard = leaderboard;
          })
          .catch((error: any) => {
            console.error('Error loading monthly leaderboard:', error);
          });
      })
      .catch((error: any) => {
        console.error('Error loading monthly leaderboard:', error);
      });
  }

  async parseLeaderboardData(snapshot: DataSnapshot, sortOrder: 'asc' | 'desc'): Promise<Player[]> {
    const leaderboard: Player[] = [];

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot: DataSnapshot) => {
        const playerData = childSnapshot.val();
        const player: Player = {
          rank: 0,
          username: childSnapshot.key,
          score: playerData.SnakeGameHighScore
        };
        leaderboard.push(player);
      });

      leaderboard.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.score - b.score;
        } else {
          return b.score - a.score;
        }
      });

      leaderboard.forEach((player, index) => {
        player.rank = index + 1;
      });
    }

    return leaderboard;
  }
}
