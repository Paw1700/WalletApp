import { Routes } from '@angular/router';
import { BootPage } from './pages/boot/boot.page';
import { HomePage } from './pages/home/home.page';
import { UserProfileSetupPage } from './pages/user_profile_setup/user_profile_setup.page';
import { AccountsListPage } from './pages/accounts_list/accounts_list.page';
import { AddAccountPage } from './pages/add_account/add_account.page';
import { USER_ACCOUNTS_RESOLVER } from './resolvers/user_accounts.resolver';
import { PROFILE_RESOLVER } from './resolvers/profile.resolver';
import { AddTransactionPage } from './pages/add_transaction/add_transaction.page';
import { RECEIVERS_RESOLVER } from './resolvers/receivers.resolver';
import { ACCOUNTS_CAROUSEL_RESOLVER } from './pages/home/resolvers/accounts_carousel.resolver';
import { ACCOUNTS_TRANSACTIONS_RESOLVER } from './pages/home/resolvers/accounts_transactions.resolver';

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
        },
        resolve: {
            profile: PROFILE_RESOLVER,
            accounts_carousel: ACCOUNTS_CAROUSEL_RESOLVER,
            accounts_transactions: ACCOUNTS_TRANSACTIONS_RESOLVER
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
    {
        path: 'accounts_list',
        pathMatch: 'full',
        component: AccountsListPage,
        data: {
            page_name: 'accounts_list'
        },
        resolve: {
            user_accounts: USER_ACCOUNTS_RESOLVER
        }
    },
    {
        path: 'add_account',
        pathMatch: 'full',
        component: AddAccountPage,
        data: {
            page_name: 'add_account'
        }
    },
    {
        path: 'add_transaction',
        pathMatch: 'full',
        component: AddTransactionPage,
        data: {
            page_name: 'add_transaction'
        },
        resolve: {
            receivers: RECEIVERS_RESOLVER
        }
    }
];
