import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TictactoeComponent } from './game/tictactoe';
import { LeaderboardComponent } from './game/leaderboard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'game', component: TictactoeComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'login', component: LoginComponent},
  //default redirect
  { path: '**', redirectTo: 'game' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
