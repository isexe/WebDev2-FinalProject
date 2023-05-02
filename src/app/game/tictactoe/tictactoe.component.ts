import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../game.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit{
  game: Game = { 
    grid: Array(9).fill(''),
    currentTurn: true
  }


  constructor(public gameService: GameService){

  }

  ngOnInit(){
    this.gameService.reset();

    // this.gameService.getGrids();
  }

  reset(){
    this.gameService.reset();
    this.game = this.gameService.getGame();
  }

  OnClick(tile: number, event: Event){
    this.gameService.playerMove(tile, event);
    this.game = this.gameService.getGame();
  }
}
