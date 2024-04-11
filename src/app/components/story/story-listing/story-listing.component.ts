import { Component, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from "../../mission/header/header.component";
import { MatDividerModule } from '@angular/material/divider';
import { SecondHeaderComponent } from "../../mission/second-header/second-header.component";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { StoryService } from '../../../services/story.service';
import { MissionSearchDTO } from '../../../models/mission-listing.model';
import { CurrentUserDTO } from '../../../models/user-models';
import { StoryDTO } from '../../../models/story-listing.model';

@Component({
  selector: 'app-story-listing',
  standalone: true,
  templateUrl: './story-listing.component.html',
  styleUrl: './story-listing.component.css',
  imports: [
    HeaderComponent,
    MatDividerModule,
    SecondHeaderComponent,
    MatCardModule,
    MatIconModule,
    CommonModule
  ]
})
export class StoryListingComponent {
  @ViewChild('filterSection') filterSection!: SecondHeaderComponent;

  storyList: StoryDTO[] = [];
  currentUserData: CurrentUserDTO;

  constructor(private storiesService: StoryService, private router: Router) {
    this.currentUserData = inject(UserService).currentUserValue();
  }

  ngOnInit(): void {
    this.getStoryList();
  }

  getStoryList = (): void => {
    this.storiesService.GetStoriesByFilter().subscribe((result) => {
      this.storyList = result.data;
    });
  }

  redirectToURL = (routeName: string, id?: number): void => {
    if (id) {
      this.router.navigateByUrl(routeName, { state: { storyId: id } });
    }
    else {
      this.router.navigateByUrl(routeName);
    }
  }
}
