import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public gameService: GameService){}

  user = new FormGroup({
    name: new FormControl(),
    password: new FormControl()
  })

  OnSubmit(name: string, password: string) {
    var data = this.gameService.loginUser({name, password});

    console.log(data.message);
  }
}
