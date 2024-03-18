import { Routes } from '@angular/router';
import { RegistrationComponent } from '../components/user/registration/registration.component';

export const routes: Routes = [
    {
        path: 'registeration',
        component: RegistrationComponent,
        title: 'registeration'
    },
    {
        path: '',
        component: RegistrationComponent,
    },
];
