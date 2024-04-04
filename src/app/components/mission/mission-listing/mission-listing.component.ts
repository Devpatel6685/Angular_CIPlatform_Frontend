import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SecondHeaderComponent } from '../second-header/second-header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MissionService } from '../../../services/mission.service';
import { CommonModule } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonFunctionService } from '../../../services/Common-function.service';
import { UserService } from '../../../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

import { MissionDTO, MissionSearchDTO } from '../../../models/mission-listing.model';
import { CurrentUserDTO } from '../../../models/user-models';
import { CommonService } from '../../../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { RecommandMissionDialogComponent } from '../recommand-mission-dialog/recommand-mission-dialog.component';

@Component({
  selector: 'app-mission-listing',
  standalone: true,
  templateUrl: './mission-listing.component.html',
  styleUrl: './mission-listing.component.css',
  imports: [
    CommonModule,
    HeaderComponent,
    SecondHeaderComponent,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
})
export class MissionListingComponent implements OnInit {

  sortBy = new FormControl('');
  sortByList: string[] = ['Newest', 'Oldest'];
  isGridView = true;
  missionList: MissionDTO[] = [];
  currentUserData: CurrentUserDTO;
  filterMission: MissionSearchDTO;

  constructor(
    private snackBar: MatSnackBar,
    private missionService: MissionService,
    public commonFunctionService: CommonFunctionService,
    private router: Router,
    private commonService: CommonService,
    public dialog: MatDialog
  ) {
    this.currentUserData = inject(UserService).currentUserValue();
    this.filterMission = {
      cityId: [],
      countryId: [],
      skillId: [],
      themeId: [],
      searchByText: '',
      SortOrder: '',
      userId: this.currentUserData != null ? this.currentUserData.id : 0,
    };
  }

  ngOnInit(): void {
    this.sortBy.valueChanges.subscribe((value) => {
      this.filterMission.SortOrder = value || '';
      this.getMissionList(this.filterMission);
    });
    this.getMissionList(this.filterMission);
  }

  getMissionList = (value: MissionSearchDTO): void => {
    value.userId = this.currentUserData != null ? this.currentUserData.id : 0;
    this.filterMission = value;
    this.missionService.GetMissionsByFilter(value).subscribe((result) => {
      this.missionList = result.data;
    });
  };

  onFilterMissionChange = (values: MissionSearchDTO): void => {
    this.getMissionList(values);
  };

  addToFavourite = (missionId: number): void => {
    this.missionService
      .AddToFavourite({
        missionId: missionId,
        userId: this.currentUserData.id,
      })
      .subscribe((res) => {
        if (res.code == HttpStatusCode.Ok && res) {
          this.snackBar.open('Done!', 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.getMissionList(this.filterMission);
        } else {
          this.snackBar.open('Error Occur!', 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      });
  };

  openDialog(id: number) {
    const dialogRef = this.dialog.open(RecommandMissionDialogComponent, {
      data: { missionId: id, userId: this.currentUserData != null ? this.currentUserData.id : 0 }
    });
  }

  redirectToVolunteer = (missionId: number): void => {
    this.router.navigateByUrl(`/volunteering-mission/${missionId}`);
  };
}
