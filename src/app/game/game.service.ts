import { Injectable } from '@angular/core';
import { Game } from './game.model';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  winner = ''
  game: Game = {
  grid: Array(9).fill(null),
  currentTurn: true
}
  // private gameUpdate = new Subject<Game>();
  constructor() {

  }

  // getGrids(){
  //   this.http.get<{grid: String[], currentTurn: boolean}>
  // }

  // getGameUpdateListener(){
  //   return this.gameUpdate.asObservable();
  // }

  reset(){
    this.game = {
      grid: Array(9).fill(null),
      currentTurn: true
    };

  }

  getGame(): Game{
    return {...this.game};
  }


  playerMove(tile: number, element: HTMLElement){
    if(this.game.currentTurn == true){
      this.game.grid[tile] = 'X';
      this.game.currentTurn = false;
      (element as HTMLInputElement).disabled = true
    }
    else if(this.game.currentTurn == false){
      this.game.grid[tile] = 'O';
      this.game.currentTurn = true;
      (element as HTMLInputElement).disabled = true
    }
  }
}
