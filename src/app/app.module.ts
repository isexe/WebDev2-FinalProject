// Base Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Routing Import
import { AppRoutingModule } from './app-routing.module';

// Component Imports
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TictactoeComponent } from './game/tictactoe/tictactoe.component';
import { LeaderboardComponent } from './game/leaderboard/leaderboard.component';
import { FooterComponent } from './footer/footer.component';

// Angular Imports
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TictactoeComponent,
    LeaderboardComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatGridListModule,
    MatSidenavModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
