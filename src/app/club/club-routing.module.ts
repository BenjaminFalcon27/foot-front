import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubComponent } from './club.component';
import { ClubDetailsComponent } from './pages/club-details/club-details.component';
import { ClubListComponent } from './pages/club-list/club-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClubComponent,
  },
  {
    path: ':id',
    component: ClubDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubRoutingModule {}
