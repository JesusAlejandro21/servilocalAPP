import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Login } from './login/login';
import { Register } from './register/register';

export const siteRoutes: Routes = [
    {
            path: '',
            children: [
                { path: 'main', component: Main },
                { path: 'login', component: Login},
                { path: 'register', component: Register},
            ]
        },
        {
            path: '**',
            redirectTo: 'main'
        }
];
