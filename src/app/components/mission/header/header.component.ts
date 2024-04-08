import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CurrentUserDTO } from '../../../models/user-models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatMenuModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentUserData: CurrentUserDTO;
  myWatchList: boolean = false;
  showButton: boolean = false;
  @Output() isWhatchList = new EventEmitter<boolean>();

  constructor(private userService: UserService, private router: Router) {
    this.currentUserData = this.userService.currentUserValue();
  }

  ngOnInit(): void {
    if (this.router.url === '/mission-listing') {
      this.showButton = true;
    }
  }

  logOut() {
    this.userService.isLoggedIn.next(false);
    this.userService.currentUser.next(null);
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  MyWatchList() {
    if (this.myWatchList) {
      this.myWatchList = false;
    }
    else {
      this.myWatchList = true;
    }
    this.isWhatchList.emit(this.myWatchList);
  }
}
