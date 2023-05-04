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
  winner: Number = 0;

  constructor(public gameService: GameService){

  }

  ngOnInit(){
    this.gameService.reset();

    // this.gameService.getGrids();
  }

  reset(){
    this.gameService.reset();
    this.game = this.gameService.getGame();
    var btns = document.getElementsByClassName("gameBtn");
    for(var i = 0; i < btns.length; i++){
      var btn = btns[i] as HTMLInputElement;
      btn.disabled = false;
    }
    this.winner = 0;
  }

  OnClick(tile: number, event: Event){
    if(this.winner != 0) return;

    this.gameService.playerMove(tile, (event.target as HTMLInputElement))
    this.game = this.gameService.getGame();

    this.winner = this.gameService.getWinner();

    if(this.winner != 0) return;

    var tiles = document.getElementsByClassName("gameBtn");
    var availTiles = [];
    for(var i=0; i<tiles.length; i++){
      var btn = tiles[i] as HTMLInputElement;
      if(!btn.disabled){
        availTiles.push(btn)
      }
    }

    if(availTiles.length > 0){
      var tileNum = Math.floor(Math.random() * availTiles.length);
      var selectedTile = availTiles[tileNum];
      tileNum = Number(selectedTile.id.slice(4))-1;

      //console.log(tileNum, selectedTile);

      this.gameService.playerMove(tileNum, selectedTile);
      this.game = this.gameService.getGame();

      this.winner = this.gameService.getWinner();
    }
  }
}
