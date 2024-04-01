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
  @ViewChild('customHeader') customHeader!: SecondHeaderComponent;

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

  getOptions = (event: FilterOptionDTO[]): void => {
    this.filterOptions = event;
  };

  clearOptions = (event: FilterOptionDTO): void => {
    if (this.customHeader) {
      const control = this.customHeader.filterForm.controls[event.controlName];
      const previousValue = control.value;

      const filteredValue = previousValue?.filter((x) => x != event.id) ?? [];

      control.setValue(filteredValue);

      if (event.controlName === 'countryId') {
        this.customHeader.cityList = [];

        if (filteredValue.length > 0) {
          this.commonService
            .GetCitiesByCountry(filteredValue)
            .subscribe((result) => {
              this.customHeader.cityList = result.data ?? [];
            });
        }
      }
    }
  };

  clearAllOptions = (): void => {
    if (this.customHeader) {
      this.customHeader.filterForm.reset({
        cityId: [],
        countryId: [],
        skillId: [],
        themeId: [],
        searchByText: '',
      });
      //this.customHeader.cityList = [];
    }
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

  redirectToVolunteer = (): void => {
    this.router.navigateByUrl('/volunteering-mission');
  };
}
