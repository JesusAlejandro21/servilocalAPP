import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Login } from './login/login';
import { Register } from './register/register';
import { Information } from '../workers/information/information';

export const siteRoutes: Routes = [
    {
            path: '',
            children: [
                { path: 'main', component: Main },
                { path: 'login', component: Login},
                { path: 'register', component: Register},
                { path: 'information/:id', component: Information}
            ]
        },
        {
            path: '**',
            redirectTo: 'main'
        }
];
