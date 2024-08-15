import { Injectable } from "@angular/core";
import { APP_DATA } from "./services/data.service";
import { APP_APPERANCE } from "./services/apperance.service";
import { APP_UPDATE } from "./services/update.service";
import { APP_SCHEDULE } from "./services/schedule.service";
import { APP_BACKUP } from "./services/backup.service";
import { APP_VALIDATOR } from "./services/validator.service";
import { Router } from "@angular/router";
import { APP_STATE } from "./services/state.service";
import { AppLocations } from "./models";

@Injectable()
export class APP_SERVICE {
    constructor(
        public DATA: APP_DATA,
        public STATE: APP_STATE,
        public APPERANCE: APP_APPERANCE,
        public UPDATE: APP_UPDATE,
        public SCHEDULE: APP_SCHEDULE,
        public BACKUP: APP_BACKUP,
        public VALIDATOR: APP_VALIDATOR,
        private ROUTER: Router
    ) { }

    startApp(): Promise<void> {
        return new Promise(async resolve => {
            this.navigate('bootstrap')
            this.APPERANCE.restart()

            await this.DATA.init()

            let redirection_location: AppLocations = 'home'
            const app_is_configured = await this.checkIfAppIsConfigured()
            const app_is_up_to_date = this.checkIfAppIsUpToDate()

            if (!app_is_configured) {
                redirection_location = 'app_first_configuration'
            } else if (app_is_configured && !app_is_up_to_date) {
                redirection_location = 'app_data_update'
            }

            setTimeout(() => {
                this.navigate(redirection_location)
                resolve()
            }, 1500)
        })
    }

    navigate(location: AppLocations) {
        this.STATE.app_current_location$.next(location)
        switch (location) {
            case "home":
                this.ROUTER.navigateByUrl('/home')
                this.APPERANCE.nav_bar_left_button_option$.next('menu')
                this.APPERANCE.nav_bar_right_button_option$.next('add_transaction')
                break
            case "bootstrap":
                this.ROUTER.navigateByUrl('/')
                this.APPERANCE.nav_bar_left_button_option$.next(null)
                this.APPERANCE.nav_bar_right_button_option$.next(null)
                break
            case "app_first_configuration":
                this.ROUTER.navigateByUrl('create_profile')
                this.APPERANCE.nav_bar_left_button_option$.next(null)
                this.APPERANCE.nav_bar_right_button_option$.next('arrow_right')
                break
            case 'accounts_list':
                this.ROUTER.navigateByUrl('accounts_list')
                this.APPERANCE.nav_bar_left_button_option$.next('menu')
                this.APPERANCE.nav_bar_right_button_option$.next('add_account')
                break
            case 'add_account':
                this.ROUTER.navigateByUrl('add_account')
                this.APPERANCE.nav_bar_left_button_option$.next('arrow_left')
                this.APPERANCE.nav_bar_right_button_option$.next('save')
                break   
        }
    }

    private checkIfAppIsConfigured(): Promise<boolean> {
        return new Promise(async resolve => {
            const profile = await this.DATA.PROFILE.get()
            if (!profile) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    }

    // !!! IMPLEMENT VERSION CHECKING !!!
    private checkIfAppIsUpToDate(): boolean {
        return true
    }
}

