import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { SecondHeaderComponent } from '../second-header/second-header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MissionService } from '../../../services/mission.service';
import { Router } from '@angular/router';
import {
  MissionDTO,
  MissionSearchDTO,
  VolunteeringMissionDTO,
} from '../../../models/mission-listing.model';
import { CurrentUserDTO } from '../../../models/user-models';
import { CommonService } from '../../../services/common.service';
import { CommonFunctionService } from '../../../services/Common-function.service';
import { UserService } from '../../../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpStatusCode } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-volunteering-mission',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SecondHeaderComponent,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CarouselModule,
    MatSnackBarModule,
  ],
  templateUrl: './volunteering-mission.component.html',
  styleUrl: './volunteering-mission.component.css',
})
export class VolunteeringMissionComponent implements OnInit {
  missionList: MissionDTO[] = [];
  currentUserData: CurrentUserDTO;
  mission!: VolunteeringMissionDTO;
  isMissionApplied: boolean = false;
  missionId = 0;

  carouselOptions: OwlOptions = {
    loop: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    dotsEach: true,
    dotsData: true,
    stagePadding: 0,
    autoHeight: false,
  };

  commentText = new FormControl<string>('');
  newRatings: number = 0;

  constructor(
    private missionService: MissionService,
    private snackBar: MatSnackBar,
    private router: Router,
    private commonService: CommonService,
    private CommonFunctionService: CommonFunctionService,
    private route: ActivatedRoute
  ) {
    this.currentUserData = inject(UserService).currentUserValue();
    this.route.params.subscribe((params) => {
      this.missionId = parseInt(params['id']);
    });
  }

  ngOnInit(): void {
    this.getVolunteeringMission(this.missionId);
    this.checkMissionApplied();
  }

  getVolunteeringMission = (missionId: number): void => {
    this.missionService
      .GetVolunteeringMission(missionId, this.currentUserData.id)
      .subscribe((result) => {
        this.mission = result.data;
        this.getRelatedMission();
      });
  };

  getRelatedMission = (): void => {
    const relatedObj: MissionSearchDTO = {
      themeId: [this.mission.themeId],
      countryId: [this.mission.countryId],
      cityId: [this.mission.cityId],
      skillId: [],
      SortOrder: '',
      searchByText: '',
      userId: this.currentUserData.id,
    };

    this.missionService.GetMissionsByFilter(relatedObj).subscribe((result) => {
      const relatedMissions: MissionDTO[] = result.data;
      const filteredMission: MissionDTO[] = relatedMissions.filter(
        (x) => x.missionId !== this.missionId
      );
      this.missionList =
        filteredMission.length <= 3
          ? filteredMission
          : filteredMission.slice(0, 3);
    });
  };

  addToFavourite = (missionId: number): void => {
    this.missionService
      .AddToFavourite({ missionId: missionId, userId: this.currentUserData.id })
      .subscribe((res) => {
        if (res.code == HttpStatusCode.Ok && res) {
          this.snackBar.open('Done!', 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.getVolunteeringMission(this.missionId);
        } else {
          this.snackBar.open('Error Occurs!', 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      });
  };

  checkMissionApplied(): void {
    this.missionService
      .checkMissionApplied(this.missionId, this.currentUserData.id)
      .subscribe((result) => {
        this.isMissionApplied = result.data;
      });
  }

  SaveMissionApplication = (): void => {
    this.missionService
      .SaveMissionApplication({
        missionId: this.missionId,
        userId: this.currentUserData.id,
      })
      .subscribe((result) => {
        if (result.code == HttpStatusCode.Ok && result) {
          this.snackBar.open('Successfully Applied!', 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.getVolunteeringMission(this.missionId);
          this.isMissionApplied = true;
        }
      });
  };

  SaveComment = (): void => {
    this.missionService
      .SaveComment({
        missionId: this.missionId,
        userId: this.currentUserData.id,
        approvalStatus: this.commentText.value ?? '',
      })
      .subscribe((result) => {
        if (result.code == HttpStatusCode.Ok && result) {
          this.commentText.setValue('');
          this.snackBar.open('Comment Added!', 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.getVolunteeringMission(this.missionId);
        }
      });
  };

  SaveMissionRating = (ratings: number): void => {
    this.newRatings = ratings;
    this.missionService
      .SaveMissionRatings({
        missionId: this.missionId,
        userId: this.currentUserData.id,
        ratings: ratings,
      })
      .subscribe((result) => {
        if (result.code == HttpStatusCode.Ok && result) {
          this.snackBar.open('Ratings updated successfuly!', 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.getVolunteeringMission(this.missionId);
        }
      });
  };

  redirectToVolunteer = (missionId: number): void => {
    this.router.navigateByUrl(`/volunteering-mission/${missionId}`);
    location.reload();
  };
}
