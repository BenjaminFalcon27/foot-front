import { PlayerService } from '../../services/player.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from '../../models/players';
import { ClubService } from 'src/app/club/services/club.service';
import { Club } from 'src/app/club/models/clubs';

export interface PlayerFormData {
  isCreateForm: boolean;
  player: Player;
}

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss'],
})
export class PlayerFormComponent implements OnDestroy, OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  clubs: Club[] = [];

  playerForm = this.fb.group({
    id: [0, Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, Validators.required],
    position: ['', Validators.required],
    goalsNumber: [0, Validators.required],
    birth: ['', Validators.required],
    club: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<PlayerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlayerFormData,
    private fb: FormBuilder,
    private playerService: PlayerService,
    private _snackBar: MatSnackBar,
    private clubService: ClubService
  ) {
    if (!data.isCreateForm) {
      this.playerForm.patchValue(data.player);
    }
  }

  ngOnInit(): void {
    this.clubService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.clubs = res;
        },
        (err) => {
          console.log('Error fetching clubs', err);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setPlayerForm(player: Player) {
    this.playerForm.setValue({
      id: player.id,
      firstName: player.firstName,
      lastName: player.lastName,
      age: player.age,
      position: player.position,
      goalsNumber: player.goalsNumber,
      birth: player.birth,
      club: player.club,
    });
  }

  get title() {
    if (this.data.isCreateForm) {
      return 'Create player';
    }
    return 'Edit player';
  }

  get submitBtnName() {
    if (this.data.isCreateForm) {
      return 'Create';
    }
    return 'Update';
  }

  onSubmit() {
    if (this.playerForm.valid) {
      this.playerForm.value.birth = new Date(
        this.playerForm.value.birth
      ).toISOString();
      if (this.data.isCreateForm) {
        this.playerForm.value.id =
          Date.now() + Math.floor(Math.random() * 1000);
        this.playerService
          .create(this.playerForm.value as Player)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            this._snackBar.open('Player created successfully', 'Close', {
              duration: 2000,
              panelClass: ['mat-toolbar', 'mat-primary'],
            });
            this.dialogRef.close();
          });
      } else {
        this.playerService
          .update(this.playerForm.value as Player)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            this._snackBar.open('Player updated successfully', 'Close', {
              duration: 2000,
              panelClass: ['mat-toolbar', 'mat-primary'],
            });
            this.dialogRef.close();
          });
      }
    }
  }
}
