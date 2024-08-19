import { Component, inject, OnInit } from "@angular/core";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { Account, Profile, UserAccount } from "../../models";
import { APP_SERVICE } from "../../app.service";
import { AccountsCarousel } from "./components/accounts-carousel/accounts-carousel.component";
import { AccountBar_Data, AccountFundsData } from "../../components/account_bar/account_bar.component";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'home_page',
    standalone: true,
    imports: [
        AccountsCarousel
    ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss'
})
export class HomePage extends NgUnsubscriber implements OnInit {
    readonly APP = inject(APP_SERVICE)
    readonly http = inject(HttpClient)
    readonly ROUTE = inject(ActivatedRoute)
    private ACCOUNTS_DATA: Account[] = []
    profile: Profile = { id: '', name: '', surname: '', image: '' }
    user_accounts: UserAccount[] = []
    accounts_carousel_data: AccountBar_Data[] = []
    active_user_account = -1

    ngOnInit(): void {
        this.fetchRouteData()
        this.reactToNavBarRightButtonClicked()
    }

    handleActiveAccountChange(account_list_number: number) {
        this.active_user_account = account_list_number
        if (account_list_number < 0) {
            this.APP.APPERANCE.nav_bar_right_button_option$.next(null)
        } else {
            this.APP.APPERANCE.nav_bar_right_button_option$.next('add_transaction')
        }
    }

    private fetchRouteData() {
        this.ROUTE.data.subscribe(route_data => {
            this.user_accounts = route_data['user_accounts']
            this.profile = route_data['profile']
            this.ACCOUNTS_DATA = route_data['accounts']
        })
        this.updateAccountCarouselData()
    }

    private updateAccountCarouselData() {
        this.accounts_carousel_data = []
        this.user_accounts.forEach(us_acc => {
            let account = this.ACCOUNTS_DATA.filter(acc => acc.id === us_acc.account_id)[0] as Account
            let funds_d: AccountFundsData = { avaible_funds: us_acc.avaible_funds, stats_data: { plus: 0, minus: 0 } }
            this.accounts_carousel_data.push({ account: account, funds_data: funds_d })
        })
    }

    private reactToNavBarRightButtonClicked() {
        this.APP.STATE.nav_bar_right_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            if (this.active_user_account > -1) {
                this.APP.navigate('add_transaction', this.user_accounts[this.active_user_account].id)
            }
        })
    }
}