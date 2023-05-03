import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Club } from '../../models/clubs';
import { Observable } from 'rxjs';
import { ClubService } from '../../services/club.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.scss'],
})
export class ClubDetailsComponent implements OnInit {
  clubId: number;
  club$: Observable<Club>;

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private location: Location
  ) {
    route.params.subscribe((params) => (this.clubId = params['id']));
  }

  ngOnInit(): void {
    this.club$ = this.clubService.getById(this.clubId);
  }

  goBack() {
    this.location.back();
  }

  showReceivedValue(value: boolean) {
    console.log(value);
  }
}
