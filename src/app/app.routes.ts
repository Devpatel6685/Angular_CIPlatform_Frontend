import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';

export const routes: Routes = [
    {
        path: 'registeration',
        component: RegistrationComponent,
        title: 'registeration'
    },
    {
        path : 'Login',
        component : LoginComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
