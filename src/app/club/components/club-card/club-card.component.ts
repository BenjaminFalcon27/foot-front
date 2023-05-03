import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Club } from '../../models/clubs';
import * as stringify from 'json-stringify-safe';

@Component({
  selector: 'app-club-card',
  templateUrl: './club-card.component.html',
  styleUrls: ['./club-card.component.scss'],
})
export class ClubCardComponent implements OnInit {
  @Input() selectedClub: Club;
  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.received.emit(true);
  }
}
