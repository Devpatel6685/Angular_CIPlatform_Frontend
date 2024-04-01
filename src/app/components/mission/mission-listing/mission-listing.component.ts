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

import {
  FilterOptionDTO,
  MissionDTO,
  MissionSearchDTO,
} from '../../../models/mission-listing.model';
import { CurrentUserDTO } from '../../../models/user-models';
import { CommonService } from '../../../services/common.service';

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
  filterOptions: FilterOptionDTO[] = [];
  missionList: MissionDTO[] = [];
  currentUserData: CurrentUserDTO;
  filterMission: MissionSearchDTO;

  constructor(
    private snackBar: MatSnackBar,
    private missionService: MissionService,
    public commonFunctionService: CommonFunctionService,
    private router: Router,
    private commonService: CommonService
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
    this.getMissionList(this.filterMission);
  }

  getMissionList = (value: MissionSearchDTO): void => {
    value.userId = this.currentUserData != null ? this.currentUserData.id : 0;
    this.filterMission = value;
    this.missionService.GetMissionsByFilter(value).subscribe((result) => {
      this.missionList = result.data;
    });
  };

  redirectToVolunteer = (): void => {
    this.router.navigateByUrl('/volunteering-mission');
  };
}
