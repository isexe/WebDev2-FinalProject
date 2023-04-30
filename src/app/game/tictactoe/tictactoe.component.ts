import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent{
  currentTurn = true;
  constructor(public gameService: GameService){

  }

  reset(){
    this.gameService.reset();
  }
  playerMove(event: Event): void{
    let id: string = (event.target as Element).id;

    if(this.currentTurn == true){
      (event.target as Element).textContent = 'X'
      this.currentTurn = false;
    }
    else if(this.currentTurn == false){
      (event.target as Element).textContent = 'O'
      this.currentTurn = true;
    }

    this.gameService.playerMove(id);
  }
}
