import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../game.model';

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
  }

  reset(){
    this.gameService.reset();
  }
  playerMove(event: Event){
    let id: string = (event.target as Element).id;

    if(this.game.currentTurn == true){
      (event.target as Element).textContent = 'X'
      this.game.currentTurn = false;
      (event.target as HTMLInputElement).disabled = true
    }
    else if(this.game.currentTurn == false){
      (event.target as Element).textContent = 'O'
      this.game.currentTurn = true;
      (event.target as HTMLInputElement).disabled = true
    }

    this.gameService.checkWin(id);
  }
}
