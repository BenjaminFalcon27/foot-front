import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';
import { SharedModule } from '../shared/shared.module';
import { PlayerListComponent } from './pages/player-list/player-list.component';
import { PlayerService } from './services/player.service';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { PlayerDetailsComponent } from './pages/player-details/player-details.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';

@NgModule({
  declarations: [
    PlayerComponent,
    PlayerListComponent,
    PlayerFormComponent,
    PlayerDetailsComponent,
    PlayerCardComponent,
  ],
  imports: [CommonModule, PlayerRoutingModule, SharedModule],
  providers: [PlayerService],
})
export class PlayerModule {}
