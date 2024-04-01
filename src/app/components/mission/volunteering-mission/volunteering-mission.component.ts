import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-volunteering-mission',
  standalone: true,
  imports: [HeaderComponent,MatDivider],
  templateUrl: './volunteering-mission.component.html',
  styleUrl: './volunteering-mission.component.css'
})
export class VolunteeringMissionComponent {
  
}
