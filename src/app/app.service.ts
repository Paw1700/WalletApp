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

            // let redirection_location: AppLocations = 'home'
            let redirection_location: AppLocations = 'transactions_list'
            const app_is_configured = await this.checkIfAppIsConfigured()
            const app_is_up_to_date = this.checkIfAppIsUpToDate()

            if (!app_is_configured) {
                redirection_location = 'app_first_configuration'
            } else if (app_is_configured && !app_is_up_to_date) {
                redirection_location = 'app_data_update'
            }

            // setTimeout(() => {
            //     this.navigate(redirection_location)
            //     resolve()
            // }, 1500)
        })
    }

    async navigate(location: AppLocations, options?: any) {
        this.STATE.app_current_location$.next(location)
        switch (location) {
            case "home":
                await this.ROUTER.navigateByUrl('/home')
                this.APPERANCE.nav_bar_left_button_option$.next('menu')
                this.APPERANCE.nav_bar_right_button_option$.next(null)
                break
            case "bootstrap":
                await this.ROUTER.navigateByUrl('/')
                this.APPERANCE.nav_bar_left_button_option$.next(null)
                this.APPERANCE.nav_bar_right_button_option$.next(null)
                break
            case "app_first_configuration":
                await this.ROUTER.navigateByUrl('create_profile')
                this.APPERANCE.nav_bar_left_button_option$.next(null)
                this.APPERANCE.nav_bar_right_button_option$.next('arrow_right')
                break
            case 'accounts_list':
                await this.ROUTER.navigateByUrl('accounts_list')
                this.APPERANCE.nav_bar_left_button_option$.next('menu')
                this.APPERANCE.nav_bar_right_button_option$.next('add_account')
                break
            case 'add_account':
                await this.ROUTER.navigateByUrl('add_account')
                this.APPERANCE.nav_bar_left_button_option$.next('arrow_left')
                this.APPERANCE.nav_bar_right_button_option$.next('save')
                break   
            case 'add_transaction':
                if (!options) {
                    console.error('Lack of user account id in navigation method');
                    return 
                }
                await this.ROUTER.navigateByUrl(`add_transaction?id=${options}`)
                this.APPERANCE.nav_bar_left_button_option$.next('arrow_left')
                this.APPERANCE.nav_bar_right_button_option$.next('save')
                break
            case "transactions_list":
                await this.ROUTER.navigateByUrl('transactions_list')
                this.APPERANCE.nav_bar_left_button_option$.next('menu')
                this.APPERANCE.nav_bar_right_button_option$.next(null)
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

