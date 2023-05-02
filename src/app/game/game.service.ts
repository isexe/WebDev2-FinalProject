import { Injectable } from '@angular/core';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  winner = ''
  game: Game = { 
  grid: Array(9).fill(''),
  currentTurn: true
}
  constructor() { 

  }

  reset(){
    //need to find a way to reset all the squares to '' and make it so you can only click it when it has like null value
    console.log('game reset');
  }

  checkWin(id: string){
    console.log(id)
  }
}
