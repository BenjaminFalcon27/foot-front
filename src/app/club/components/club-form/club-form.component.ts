import { ClubService } from '../../services/club.service';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Club } from '../../models/clubs';
import { Player } from 'src/app/player/models/players';
import { PlayerService } from 'src/app/player/services/player.service';

export interface ClubFormData {
  isCreateForm: boolean;
  club: Club;
}

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.scss'],
})
export class ClubFormComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  players: Player[] = [];

  clubForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    creationDate: ['', Validators.required],
    players: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<ClubFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClubFormData,
    private fb: FormBuilder,
    private clubService: ClubService,
    private playerService: PlayerService,
    private _snackBar: MatSnackBar
  ) {
    if (!data.isCreateForm) {
      this.clubForm.patchValue(data.club);
    }
  }

  ngOnInit(): void {
    this.playerService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.players = res;
        },
        (err) => {
          console.log('Error fetching players', err);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setClubForm(club: Club) {
    this.clubForm.setValue({
      id: club.id,
      name: club.name,
      creationDate: club.creationDate,
      players: club.players,
    });
  }

  get title() {
    if (this.data.isCreateForm) {
      return 'Create club';
    }
    return 'Edit club';
  }

  get submitBtnName() {
    if (this.data.isCreateForm) {
      return 'Create';
    }
    return 'Update';
  }

  onSubmit() {
    if (this.clubForm.valid) {
      const club: Club = {
        id: this.clubForm.get('id').value,
        name: this.clubForm.get('name').value,
        creationDate: this.clubForm.get('creationDate').value,
        players: this.clubForm.get('players').value,
      };

      if (this.data.isCreateForm) {
        this.clubService
          .create(club)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (club) => {
              this.dialogRef.close(true);
              this._snackBar.open('Club created successfully', 'Close', {
                duration: 3000,
              });
            },
            (error) => {
              this._snackBar.open('Error creating club', 'Close', {
                duration: 3000,
              });
            }
          );
      } else {
        this.clubService
          .update(club)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (club) => {
              this.dialogRef.close(true);
              this._snackBar.open('Club updated successfully', 'Close', {
                duration: 3000,
              });
            },
            (error) => {
              this._snackBar.open('Error updating club', 'Close', {
                duration: 3000,
              });
            }
          );
      }
    }
  }
}
