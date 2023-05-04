import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'game-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  tableColumns: string[] = ['name', 'wins', 'losses', 'ties'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    // https://stackoverflow.com/questions/46746598/angular-material-how-to-refresh-a-data-source-mat-table
    this.gameService.getUsers().subscribe((users: Array<any>) => {
      this.dataSource.data = users.sort((a, b) =>{
        // may want to improve this sorting later
        // could do weighted values (b.wins*2 + b.ties - b.losses)?
        // return (b.wins - b.losses) - (a.wins - a.losses);
        return b.wins - a.wins;
      })
    });
  }
}
