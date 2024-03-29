import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CurrentUserDTO } from '../../../models/user-models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentUserData: CurrentUserDTO;

  constructor(private userService: UserService, private router: Router) {
    this.currentUserData = this.userService.currentUserValue();
  }

  logOut() {
    this.userService.isLoggedIn.next(false);
    this.userService.currentUser.next(null);
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
