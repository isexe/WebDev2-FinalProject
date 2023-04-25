import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game';
import { LeaderboardComponent } from './leaderboard';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  //default redirect
  { path: '**', redirectTo: 'game' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
