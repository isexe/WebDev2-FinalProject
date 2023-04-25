import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game';
import { LeaderboardComponent } from './leaderboard';
import { TicTacToeComponent } from './tic-tac-toe';

const routes: Routes = [
  { path: '', component: GameComponent},
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'tictactoe', component: TicTacToeComponent},
  //default redirect
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
