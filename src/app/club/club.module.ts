import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { ClubComponent } from './club.component';
import { SharedModule } from '../shared/shared.module';
import { ClubListComponent } from './pages/club-list/club-list.component';
import { ClubService } from './services/club.service';
import { ClubDetailsComponent } from './pages/club-details/club-details.component';
import { ClubCardComponent } from './components/club-card/club-card.component';
import { ClubFormComponent } from './components/club-form/club-form.component';
import { PlayerService } from '../player/services/player.service';

@NgModule({
  declarations: [
    ClubComponent,
    ClubListComponent,
    ClubFormComponent,
    ClubDetailsComponent,
    ClubCardComponent,
  ],
  imports: [CommonModule, ClubRoutingModule, SharedModule],
  providers: [ClubService, PlayerService],
})
export class ClubModule {}
