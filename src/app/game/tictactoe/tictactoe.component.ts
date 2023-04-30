import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent{
  constructor(public gameService: GameService){

  }

  reset(){
    this.gameService.reset();
  }
  playerMove(event: Event): void{
    let id: string = (event.target as Element).id;
    this.gameService.playerMove(id);
  }
}
