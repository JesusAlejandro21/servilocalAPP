import { Routes } from '@angular/router';

export const routes: Routes = [
      {
        path: 'site',
        loadChildren: () => import('./components/site/site.routes').then(m => m.siteRoutes)
    },

    {
        path: 'workers',
        loadChildren: () => import('./components/workers/workers.routes').then(m => m.workersRoutes)
    },
    
    
    {
        path: '**',
        redirectTo: 'site/main'
    }
];
