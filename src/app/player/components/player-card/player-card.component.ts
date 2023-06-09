import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../../models/players';
import * as stringify from 'json-stringify-safe';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit {
  @Input() selectedPlayer: Player;
  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.received.emit(true);
  }
}
