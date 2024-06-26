import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { MissionListingComponent } from './components/mission/mission-listing/mission-listing.component';
import { AuthGuard } from './Common/authentication/auth-guard';
import { VolunteeringMissionComponent } from './components/mission/volunteering-mission/volunteering-mission.component';
import { StoryListingComponent } from './components/story/story-listing/story-listing.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'CI | Login',
  },
  {
    path: 'register',
    component: RegistrationComponent,
    title: 'CI | Register',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'CI | Forgot Password',
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    title: 'CI | Reset Password',
  },
  {
    path: 'mission-listing',
    component: MissionListingComponent,
    title: 'CI | Mission Listing',
    canActivate: [AuthGuard],
  },
  {
    path: 'volunteering-mission/:id',
    component: VolunteeringMissionComponent,
    title: 'CI | Mission Listing',
    canActivate: [AuthGuard],
  },
  {
    path: 'story-listing',
    component: StoryListingComponent,
    title: 'CI | Story Listing',
  },
];
