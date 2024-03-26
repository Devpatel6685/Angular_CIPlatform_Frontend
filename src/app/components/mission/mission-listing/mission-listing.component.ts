import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SecondHeaderComponent } from '../second-header/second-header.component';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-mission-listing',
  standalone: true,
  templateUrl: './mission-listing.component.html',
  styleUrl: './mission-listing.component.css',
  imports: [HeaderComponent, SecondHeaderComponent,MatCardModule],
})
export class MissionListingComponent {}
