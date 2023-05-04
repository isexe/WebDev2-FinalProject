import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TictactoeComponent } from './game/tictactoe';
import { LeaderboardComponent } from './game/leaderboard';

const routes: Routes = [
  { path: 'game', component: TictactoeComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  //default redirect
  { path: '**', redirectTo: 'game' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
