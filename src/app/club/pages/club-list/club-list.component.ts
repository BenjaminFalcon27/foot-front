import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { Club } from '../../models/clubs';
import { ClubService } from '../../services/club.service';
import { Router } from '@angular/router';
import { ClubFormComponent } from '../../components/club-form/club-form.component';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss'],
})
export class ClubListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'creationDate', 'actions'];
  clubs$: Observable<Club[]>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private clubService: ClubService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.clubs$ = this.clubService.get();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  openClubForm(club?: Club) {
    const dialogRef = this.dialog.open(ClubFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: club ? false : true,
        club: club ? club : null,
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
    this.clubs$ = this.clubService.get();
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete this club ?',
        typeMessage: 'warning',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Yes',
        noButtonLabel: 'No',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.clubService
            .delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this._snackBar.open('Club deleted', 'Close', {
                duration: 2000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.fetchData();
            });
        }
      });
  }

  showClubDetails(id: number) {
    this.router.navigate(['clubs', id]);
  }
}
