import { Component, inject, OnInit } from "@angular/core";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { Account, Profile, UserAccount } from "../../models";
import { APP_SERVICE } from "../../app.service";
import { AccountsCarousel } from "./components/accounts-carousel/accounts-carousel.component";
import { AccountBar_Data, AccountFundsData } from "../../components/account_bar/account_bar.component";
import ACCOUNTS_DATA_JSON from '../../../../public/assets/data/accounts.json'

@Component({
    selector: 'home_page',
    standalone: true,
    imports: [
        AccountsCarousel
    ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss'
})
export class HomePage extends NgUnsubscriber implements OnInit{
    readonly APP = inject(APP_SERVICE)
    private readonly ACCOUNTS_DATA = ACCOUNTS_DATA_JSON
    profile: Profile = {id: '', name: '', surname: '', image: ''}
    user_accounts: UserAccount[] = []
    accounts_carousel_data: AccountBar_Data[] = []

    ngOnInit(): void {
        this.fetchUserData()
    }

    handleActiveAccountChange(account_list_number: number) {
        console.log(account_list_number);
        
    }

    private async fetchUserData() {
        try {
            this.profile = await this.APP.DATA.PROFILE.get()
            this.user_accounts = await this.APP.DATA.USER_ACCOUNT.getAll()
            this.updateAccountCarouselData(this.user_accounts)
        } catch (err) {
            console.error(err)
        }
    }

    private updateAccountCarouselData(user_accounts: UserAccount[]) {
        this.user_accounts = []
        user_accounts.forEach( us_acc => {
            let account = this.ACCOUNTS_DATA.filter(acc => acc.id === us_acc.account_id)[0] as Account
            let funds_d: AccountFundsData = {avaible_funds: us_acc.avaible_funds, stats_data: {plus: 0, minus: 0}}
            this.accounts_carousel_data.push({account: account, funds_data: funds_d})
        })
    }
}