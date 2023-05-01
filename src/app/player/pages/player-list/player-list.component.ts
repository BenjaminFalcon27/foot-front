import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { PlayerFormComponent } from '../../components/player-form/player-form.component';
import { Player } from '../../models/players';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'age',
    'position',
    'goalsNumber',
    'birth',
    'club',
    'actions',
  ];
  players$: Observable<Player[]>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private playerService: PlayerService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.players$ = this.playerService.get();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  openPlayerForm(player?: Player) {
    const dialogRef = this.dialog.open(PlayerFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: player ? false : true,
        player: player ? player : null,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.fetchData();
        }
      });
  }

  fetchData() {
    this.players$ = this.playerService.get();
  }

  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete this player ?',
        typeMessage: 'warning',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Yes',
        noButtonLabel: 'No',
      },
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result === 'Yes') {
          this.playerService
            .delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this._snackBar.open('Player deleted', 'Close', {
                duration: 2000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.fetchData();
            });
        }
      });
  }

  showPlayerDetails(id: number) {
    this.router.navigate(['players', id]);
  }
}
