import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  users = [
    {username:"player1", password:""},
    {username:"player2", password:""},
    {username:"player3", password:""}
  ];

  enteredUser = '';
  enteredPassword = '';

  OnSubmit() {
    const user = {username: this.enteredUser, password: this.enteredPassword}
  }
}
