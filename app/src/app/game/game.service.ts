import { Injectable } from '@angular/core';
import { Game } from './game.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  winner = 0;
  game: Game = {
    grid: Array(9).fill(''),
    currentTurn: true,
  };

  // private gameUpdate = new Subject<Game>();
  constructor(private http: HttpClient) {}
  //constructor() {  }

  // getGrids(){
  //   this.http.get<{grid: String[], currentTurn: boolean}>
  // }

  // getGameUpdateListener(){
  //   return this.gameUpdate.asObservable();
  // }

  reset() {
    this.winner = 0;
    this.game = {
      grid: Array(9).fill(''),
      currentTurn: true,
    };
  }

  getGame(): Game {
    return { ...this.game };
  }

  getWinner(): number {
    return this.winner;
  }

  getUsers(): any {
    //! may need to be updated when deployed
    // could implment map here to format return
    return this.http.get<{ message: string; users: any }>('/api/users').pipe(
      map((usersData) => {
        return usersData.users.map((user: any) => {
          return {
            name: user.name,
            wins: user.wins,
            losses: user.losses,
            ties: user.ties,
            _id: user._id,
          };
        });
      })
    );
  }

  playerMove(tile: number, element: HTMLElement) {
    if (this.game.currentTurn == true) {
      this.game.grid[tile] = 'X';
      this.game.currentTurn = false;
      (element as HTMLInputElement).disabled = true;
    } else if (this.game.currentTurn == false) {
      this.game.grid[tile] = 'O';
      this.game.currentTurn = true;
      (element as HTMLInputElement).disabled = true;
    }

    this.checkGameState();
  }

  // will set winner in gameService
  // 0 means no current winner
  // 1 means player 1 is the winner
  // 2 means player 2 is the winner
  private checkGameState() {
    // check horizontal position
    if (this.winner == 0) {
      for (var i = 0; i < 3; i++) {
        if (
          this.game.grid[i * 3] == this.game.grid[i * 3 + 1] &&
          this.game.grid[i * 3] == this.game.grid[i * 3 + 2]
        ) {
          if (this.game.grid[i * 3] == 'X') this.winner = 1;
          else if (this.game.grid[i * 3] == 'O') this.winner = 2;
        }

        if (this.winner != 0) break;
      }
    }

    // check vertical position
    if (this.winner == 0) {
      for (var i = 0; i < 3; i++) {
        if (
          this.game.grid[i] == this.game.grid[i + 3] &&
          this.game.grid[i] == this.game.grid[i + 6]
        ) {
          if (this.game.grid[i] == 'X') this.winner = 1;
          else if (this.game.grid[i] == 'O') this.winner = 2;
        }

        if (this.winner != 0) break;
      }
    }

    if (this.winner == 0) {
      if (
        this.game.grid[0] == this.game.grid[4] &&
        this.game.grid[0] == this.game.grid[8]
      ) {
        if (this.game.grid[0] == 'X') this.winner = 1;
        else if (this.game.grid[0] == 'O') this.winner = 2;
      }
    }

    if (this.winner == 0) {
      if (
        this.game.grid[2] == this.game.grid[4] &&
        this.game.grid[2] == this.game.grid[6]
      ) {
        if (this.game.grid[2] == 'X') this.winner = 1;
        else if (this.game.grid[2] == 'O') this.winner = 2;
      }
    }

    // check for full board
    if (this.winner == 0) {
      var count = 0;
      for (count = 0; count < this.game.grid.length; count++) {
        if (!(this.game.grid[count] == 'X' || this.game.grid[count] == 'O')) {
          break;
        }
      }

      if (count == this.game.grid.length) {
        this.winner = -1;
      }
    }

    // if there is winner, update user record
    if (this.winner != 0) {
      switch (this.winner) {
        case -1:
          this.updateUserRecord('ties', 1);
          break;
        case 1:
          this.updateUserRecord('wins', 1);
          break;
        case 2:
          this.updateUserRecord('losses', 1);
          break;
      }
    }
  }

  private updateUserRecord(field: string, value: number): void {
    var user = { name: 'Test', wins: 0, losses: 0, ties: 0 };

    var tmpUser = 'Test';
    this.http
      .post<{ message: string }>(
        '/api/records/' + tmpUser + '/' + field + '/' + value,
        user
      )
      .subscribe((data) => {
        console.log(data.message);
      });
  }
}
