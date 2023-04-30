import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  winner = ''

  constructor() { 

  }

  reset(){
    //need to find a way to reset all the squares to '' and make it so you can only click it when it has like null value
    console.log('game reset');
  }

  playerMove(id: string){
    //need to make it so when button is pressed HTML text is replaced and disabled so you cannot click it again
    console.log(id)
  }
}
