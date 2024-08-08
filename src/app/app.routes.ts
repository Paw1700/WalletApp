import { Routes } from '@angular/router';
import { BootPage } from './pages/boot/boot.page';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: BootPage
    },
    {
        path: 'home',
        pathMatch: 'full',
        component: HomePage
    }
];
