import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { RecommandUserDTO } from '../../../models/mission-listing.model';
import { CommonService } from '../../../services/common.service';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MissionService } from '../../../services/mission.service';

@Component({
  selector: 'app-recommand-mission-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIcon, MatDivider, MatCheckboxModule, FormsModule],
  templateUrl: './recommand-mission-dialog.component.html',
  styleUrl: './recommand-mission-dialog.component.css'
})
export class RecommandMissionDialogComponent {

  users: RecommandUserDTO[] = [];
  missionId: number = 0;
  userId: number = 0;

  constructor(private commonService: CommonService, @Inject(MAT_DIALOG_DATA) public data: any, private missionService: MissionService) {
    this.missionId = data.missionId;
    this.userId = data.userId;
  }

  ngOnInit(): void {
    this.commonService.GetAllUsers().subscribe((result) => {
      this.users = result.data;
      this.users.forEach(x => x.completed = false);
    });
  }

  allComplete: boolean = false;

  updateAllComplete(user: RecommandUserDTO) {
    this.users.filter(x => x.id == user.id).forEach(x => x.completed = !user.completed);
    this.allComplete = this.users != null && this.users.every(t => t.completed);
  }

  someComplete() {
    if (this.users == null) {
      return false;
    }
    return this.users.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.users == null) {
      return;
    }
    this.users.forEach(t => (t.completed = completed));
  }

  GetSelectedUser() {
    this.missionService.RecommandMissionToWorkers(this.missionId, this.userId, this.users.filter(x => x.completed === true)).subscribe((res) => console.log(res.data));
  }

}

