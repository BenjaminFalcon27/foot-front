import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/players';
import { environment } from './../../../environments/environment';
import { Club } from 'src/app/club/models/clubs';

@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) {}

  getClubs(): Observable<Club> {
    return this.http.get<Club>(environment.footApiBaseUrl + '/clubs');
  }

  get(): Observable<Player[]> {
    return this.http.get<Player[]>(environment.footApiBaseUrl + '/players');
  }

  getById(id: number): Observable<Player> {
    return this.http.get<Player>(environment.footApiBaseUrl + '/players/' + id);
  }

  post(player: Player): Observable<Player> {
    return this.http.post<Player>(
      environment.footApiBaseUrl + '/players',
      player
    );
  }

  delete(id: number): Observable<Player> {
    return this.http.delete<Player>(
      environment.footApiBaseUrl + '/players/' + id
    );
  }

  update(player: Player): Observable<Player> {
    return this.http.put<Player>(
      environment.footApiBaseUrl + '/players/' + player.id,
      player
    );
  }

  create(player: Player): Observable<Player> {
    return this.http.post<Player>(
      environment.footApiBaseUrl + '/players',
      player
    );
  }
}
