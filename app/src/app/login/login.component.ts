import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = new FormControl('');
  password = new FormControl('');

  users = [
    {username:"player1", password:""},
    {username:"player2", password:""},
    {username:"player3", password:""}
  ];

  OnSubmit() {

    if (this.username.value && this.password.value) {

    }
  }
}
