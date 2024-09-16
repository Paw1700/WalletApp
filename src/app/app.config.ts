import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { APP_SERVICE } from './app.service';
import { APP_APPERANCE } from './services/apperance.service';
import { APP_BACKUP } from './services/backup.service';
import { APP_SCHEDULE } from './services/schedule.service';
import { APP_UPDATE } from './services/update.service';
import { PROFILE_SERVICE } from './services/profile.service';
import { DatabaseManager } from './util/db.driver';
import { APP_STATE } from './services/state.service';
import { USER_ACCOUNTS_RESOLVER } from './resolvers/user_accounts.resolver';
import { PROFILE_RESOLVER } from './resolvers/profile.resolver';
import { ACCOUNTS_RESOLVER } from './resolvers/accounts.resolver';
import { RECEIVERS_RESOLVER } from './resolvers/receivers.resolver';
import { CATEGORY_RESOLVER } from './resolvers/category.resolver';
import { TRANSACTIONS_RESOLVER } from './resolvers/transactions.resolver';
import { ACCOUNT_BAR_RESOLVER_FOR_ADDING_TRANSACTION_PAGE } from './pages/add_transaction/resolvers/account_bar_data_for_add_transaction_page.resolver';
import { STORAGE_SERVICE } from './services/storage.service';
import { VALIDATOR_SERVICE } from './services/validator.service';
import { USER_ACCOUNT_SERVICE } from './services/user_account.data.service';
import { TRANSACTION_SERVICE } from './services/transaction.service';
import { ACCOUNT_BAR_CAROUSEL_LIST_RESOLVER } from './resolvers/account_bar_component_data.resolver';

export const appConfig: ApplicationConfig = {
  providers: [
    //ANGULAR PROVIDERS
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideAnimations(), 
    provideRouter(routes), 
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
    }),
    provideHttpClient(),
    
    // UTIL
    DatabaseManager,

    //SERVICES
    APP_SERVICE,
    STORAGE_SERVICE,
    APP_APPERANCE,
    APP_BACKUP,
    APP_STATE,
    APP_SCHEDULE,
    APP_UPDATE,
    VALIDATOR_SERVICE,
    PROFILE_SERVICE,
    USER_ACCOUNT_SERVICE,

    //RESOLVERS
    USER_ACCOUNTS_RESOLVER,
    PROFILE_RESOLVER,
    ACCOUNTS_RESOLVER,
    RECEIVERS_RESOLVER,
    TRANSACTION_SERVICE,
    CATEGORY_RESOLVER,
    TRANSACTIONS_RESOLVER,
    ACCOUNT_BAR_RESOLVER_FOR_ADDING_TRANSACTION_PAGE,
    ACCOUNT_BAR_CAROUSEL_LIST_RESOLVER
  ]
};
