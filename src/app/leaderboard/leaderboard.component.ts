import { Component } from '@angular/core';

@Component({
  selector: 'game-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent {
  tableColumns: string[] = ['username', 'wins', 'losses'];

  records = [
    { username: 'Player1', wins: 1, losses: 0 },
    { username: 'Player2', wins: 1, losses: 1 },
    { username: 'Player3', wins: 0, losses: 1 },
  ];
}
