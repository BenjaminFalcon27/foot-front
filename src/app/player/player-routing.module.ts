import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player.component';
import { PlayerListComponent } from './pages/player-list/player-list.component';
import { PlayerDetailsComponent } from './pages/player-details/player-details.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerListComponent,
  },
  {
    path: ':id',
    component: PlayerDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerRoutingModule {}
