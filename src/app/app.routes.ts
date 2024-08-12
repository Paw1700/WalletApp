import { Routes } from '@angular/router';
import { BootPage } from './pages/boot/boot.page';
import { HomePage } from './pages/home/home.page';
import { UserProfileSetupPage } from './pages/user_profile_setup/user_profile_setup.page';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: BootPage,
        data: {
            page_name: 'boot'
        }
    },
    {
        path: 'home',
        pathMatch: 'full',
        component: HomePage,
        data: {
            page_name: 'home'
        }
    },
    {
        path: 'create_profile',
        pathMatch: 'full',
        component: UserProfileSetupPage,
        data: {
            page_name: 'create_profile'
        }
    },
    // {
    //     path: 'accounts_list',
    //     pathMatch: 'full',
    //     component: 
    // }
];
