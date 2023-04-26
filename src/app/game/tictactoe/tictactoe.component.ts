import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent{

  constructor(public gameService: GameService){

  }
}
