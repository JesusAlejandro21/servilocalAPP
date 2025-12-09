import { Routes } from '@angular/router';
import { Contracts } from './contracts/contracts';
import { Workers } from './workers/workers';
import { Information } from './information/information';
import { Payment } from './payment/payment';
import { Favoritos } from './favoritos/favoritos';

export const workersRoutes: Routes = [
    {
            path: '',
            children: [
                { path: 'contracts', component:Contracts},
                { path: 'workers', component: Workers},
                { path: 'information/:id', component: Information},
                { path: 'preferencemp', component: Payment},
                { path: 'favoritos', component: Favoritos}
            ]
        },
        {
            path: '**',
            redirectTo: 'workers'
        }
];
