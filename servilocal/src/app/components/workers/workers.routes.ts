import { Routes } from '@angular/router';
import { Contracts } from './contracts/contracts';
import { Workers } from './workers/workers';
import { Information } from './information/information';

export const workersRoutes: Routes = [
    {
            path: '',
            children: [
                { path: 'contracts', component:Contracts},
                { path: 'workers', component: Workers},
                { path: 'information/:id', component: Information}
            ]
        },
        {
            path: '**',
            redirectTo: 'workers'
        }
];
