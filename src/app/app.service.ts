import { Injectable } from "@angular/core";
import { APP_APPERANCE } from "./services/apperance.service";
import { APP_UPDATE } from "./services/update.service";
import { APP_SCHEDULE } from "./services/schedule.service";
import { APP_BACKUP } from "./services/backup.service";
import { VALIDATOR_SERVICE } from "./services/validator.service";
import { Router } from "@angular/router";
import { APP_STATE } from "./services/state.service";
import { AppLocations } from "./models";
import { PROFILE_SERVICE } from "./services/profile.service";
import { STORAGE_SERVICE } from "./services/storage.service";
import { USER_ACCOUNT_SERVICE } from "./services/user_account.data.service";
import { TRANSACTION_SERVICE } from "./services/transaction.service";

@Injectable()
export class APP_SERVICE {
    constructor(
        public STATE: APP_STATE,
        public APPERANCE: APP_APPERANCE,
        public UPDATE: APP_UPDATE,
        public SCHEDULE: APP_SCHEDULE,
        public BACKUP: APP_BACKUP,
        public VALIDATOR: VALIDATOR_SERVICE,
        public PROFILE: PROFILE_SERVICE,
        public USER_ACCOUNT: USER_ACCOUNT_SERVICE,
        public TRANSACTION: TRANSACTION_SERVICE,
        public STORAGE: STORAGE_SERVICE,
        private ROUTER: Router
    ) { }

    startApp(): Promise<void> {
        return new Promise(async resolve => {
            this.navigate('bootstrap')
            this.APPERANCE.restart()

            await this.STORAGE.init()
            
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
                // this.navigate('account', {user_account_id: "accounts-0"})
                resolve()
            }, 1500)
        })
    }

    async navigate(location: AppLocations, options?: any) {
        this.STATE.app_current_location$.next(location)
        switch (location) {
            case "home":
                await this.ROUTER.navigateByUrl('/home')
                this.APPERANCE.setAppAccentColor(null)
                this.APPERANCE.nav_bar_left_button_option$.next('menu')
                this.APPERANCE.nav_bar_right_button_option$.next(null)
                break
            case "bootstrap":
                await this.ROUTER.navigateByUrl('/')
                this.APPERANCE.setAppAccentColor(null)
                this.APPERANCE.nav_bar_left_button_option$.next(null)
                this.APPERANCE.nav_bar_right_button_option$.next(null)
                break
            case "app_first_configuration":
                await this.ROUTER.navigateByUrl('create_profile')
                this.APPERANCE.setAppAccentColor(null)
                this.APPERANCE.nav_bar_left_button_option$.next(null)
                this.APPERANCE.nav_bar_right_button_option$.next('arrow_right')
                break
            case 'accounts_list':
                await this.ROUTER.navigateByUrl('accounts_list')
                this.APPERANCE.setAppAccentColor(null)
                this.APPERANCE.nav_bar_left_button_option$.next('menu')
                this.APPERANCE.nav_bar_right_button_option$.next('add_account')
                break
            case 'add_account':
                await this.ROUTER.navigateByUrl('add_account')
                this.APPERANCE.setAppAccentColor(null)
                this.APPERANCE.nav_bar_left_button_option$.next('arrow_left')
                this.APPERANCE.nav_bar_right_button_option$.next('save')
                break   
            case 'add_transaction':
                if (!options && (!options.usa_id || !options.tr_id)) { // !!!
                    console.error('Lack of user account id or transaction id in navigation method');
                    return 
                }
                if (options.usa_id) {
                    await this.ROUTER.navigateByUrl(`add_transaction?usa_id=${options.usa_id}`) // !!!
                } else if (options.tr_id) {
                    await this.ROUTER.navigateByUrl(`add_transaction?tr_id=${options.tr_id}`) // !!!
                }
                this.APPERANCE.nav_bar_left_button_option$.next('arrow_left')
                this.APPERANCE.nav_bar_right_button_option$.next('save')
                break
            case "transactions_list":
                await this.ROUTER.navigateByUrl('transactions_list')
                this.APPERANCE.setAppAccentColor(null)
                this.APPERANCE.nav_bar_left_button_option$.next('menu')
                this.APPERANCE.nav_bar_right_button_option$.next(null)
                break
            case "account":
                if (!options || !options.user_account_id) {
                    this.STATE.errorHappend(new Error('APP-GENERAL'))
                    console.error('Lack of user account id in navigation method');
                    return
                }
                await this.ROUTER.navigateByUrl(`account?user_account_id=${options.user_account_id}`) 
                this.APPERANCE.setAppAccentColor(null)
                this.APPERANCE.nav_bar_left_button_option$.next('arrow_left')
                this.APPERANCE.nav_bar_right_button_option$.next(null)
                break
            default:
                await this.ROUTER.navigateByUrl('/home')
                this.APPERANCE.setAppAccentColor(null)
                this.APPERANCE.nav_bar_left_button_option$.next('menu')
                this.APPERANCE.nav_bar_right_button_option$.next(null)
                break
        }
    }

    private checkIfAppIsConfigured(): Promise<boolean> {
        return new Promise(async resolve => {
            const profile = await this.PROFILE.get()
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

