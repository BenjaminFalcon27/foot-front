import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from '../models/clubs';
import { environment } from './../../../environments/environment';

@Injectable()
export class ClubService {
  constructor(private http: HttpClient) {}

  get(): Observable<Club[]> {
    return this.http.get<Club[]>(environment.footApiBaseUrl + '/clubs');
  }

  getById(id: number): Observable<Club> {
    return this.http.get<Club>(environment.footApiBaseUrl + '/clubs/' + id);
  }

  post(club: Club): Observable<Club> {
    return this.http.post<Club>(environment.footApiBaseUrl + '/clubs', club);
  }

  delete(id: number): Observable<Club> {
    return this.http.delete<Club>(environment.footApiBaseUrl + '/clubs/' + id);
  }

  update(club: Club): Observable<Club> {
    return this.http.put<Club>(
      environment.footApiBaseUrl + '/clubs/' + club.id,
      club
    );
  }

  create(club: Club): Observable<Club> {
    return this.http.post<Club>(environment.footApiBaseUrl + '/clubs', club);
  }
}
