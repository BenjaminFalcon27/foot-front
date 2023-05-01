import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../models/players';
import { Observable } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
})
export class PlayerDetailsComponent implements OnInit {
  playerId: number;
  player$: Observable<Player>;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location
  ) {
    route.params.subscribe((params) => (this.playerId = params['id']));
  }

  ngOnInit(): void {
    this.player$ = this.playerService.getById(this.playerId);
  }

  goBack() {
    this.location.back();
  }

  showReceivedValue(value: boolean) {
    console.log(value);
  }
}
