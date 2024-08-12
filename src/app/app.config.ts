import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { APP_SERVICE } from './app.service';
import { APP_DATA } from './services/data.service';
import { APP_APPERANCE } from './services/apperance.service';
import { APP_BACKUP } from './services/backup.service';
import { APP_SCHEDULE } from './services/schedule.service';
import { APP_UPDATE } from './services/update.service';
import { APP_VALIDATOR } from './services/validator.service';
import { PROFILE_DATA_SERVICE } from './services/data/profile.data.service';
import { DatabaseManager } from './util/db.driver';
import { APP_STATE } from './services/state.service';
import { USER_ACCOUNT_DATA_SERVICE } from './services/data/user_account.data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideAnimations(), 
    provideRouter(routes), 
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
    }),
    provideHttpClient(),
    DatabaseManager,
    APP_SERVICE,
    APP_DATA,
    APP_APPERANCE,
    APP_BACKUP,
    APP_STATE,
    APP_SCHEDULE,
    APP_UPDATE,
    APP_VALIDATOR,
    PROFILE_DATA_SERVICE,
    USER_ACCOUNT_DATA_SERVICE
  ]
};
