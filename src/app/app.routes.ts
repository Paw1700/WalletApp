import { Routes } from '@angular/router';
import { BootPage } from './pages/boot/boot.page';
import { HomePage } from './pages/home/home.page';
import { UserProfileSetupPage } from './pages/user_profile_setup/user_profile_setup.page';
import { AccountsListPage } from './pages/accounts_list/accounts_list.page';
import { AddAccountPage } from './pages/add_account/add_account.page';
import { USER_ACCOUNTS_RESOLVER } from './resolvers/user_accounts.resolver';
import { AddTransactionPage } from './pages/add_transaction/add_transaction.page';
import { RECEIVERS_RESOLVER } from './resolvers/receivers.resolver';
import { CATEGORY_RESOLVER } from './resolvers/category.resolver';
import { TransactionsListPage } from './pages/transactions_list/transactions_list.page';
import { ACCOUNTS_RESOLVER } from './resolvers/accounts.resolver';
import { PROFILE_RESOLVER } from './resolvers/profile.resolver';
import { ACCOUNT_BAR_CAROUSEL_LIST_RESOLVER } from './resolvers/account_bar_component_data.resolver';
import { ADD_TRANSACTION_PAGE_DATA_RESOLVER } from './pages/add_transaction/resolvers/add_transaction_data_resolver.resolver';
import { AccountPage } from './pages/account/account.page';
import { ACCOUNT_PAGE_DATA_RESOLVER } from './pages/account/account.page.resolver';
import { TransferFundsPage } from './pages/transfer_funds/transfer_funds.component';
import { TRANSFER_FUNDS_PAGE_RESOLVER } from './pages/transfer_funds/transfer_funds.resolver';

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
            accounts_bar_component_data_list: ACCOUNT_BAR_CAROUSEL_LIST_RESOLVER,
            profile: PROFILE_RESOLVER
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
        },
        resolve: {
            accounts: ACCOUNTS_RESOLVER
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
            add_transaction_page_data: ADD_TRANSACTION_PAGE_DATA_RESOLVER
        }
    },
    {
        path: 'transactions_list',
        pathMatch: 'full',
        component: TransactionsListPage,
        data: {
            page_name: 'transactions_list'
        },
        resolve: {
            user_accounts_list: USER_ACCOUNTS_RESOLVER,
            accounts_list: ACCOUNTS_RESOLVER,
            categories_list: CATEGORY_RESOLVER,
            receivers_list: RECEIVERS_RESOLVER
        }
    },
    {
        path: 'account',
        pathMatch: 'full',
        component: AccountPage,
        data: {
            page_name: 'account'
        },
        resolve: {
            account_page_data: ACCOUNT_PAGE_DATA_RESOLVER
        }
    },
    {
        path: 'transfer_funds',
        pathMatch: 'full',
        component: TransferFundsPage,
        data: {
            page_name: 'transfer_funds'
        },
        resolve: {
            page_data: TRANSFER_FUNDS_PAGE_RESOLVER
        }
    }
];
