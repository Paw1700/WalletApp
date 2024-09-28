import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgUnsubscriber } from "../../util/ngUnsubscriber";
import { APP_SERVICE } from "../../app.service";
import { Account, UserAccount } from "../../models";
import { AccountNameBar } from "./components/account_name_bar.component";
import { NumberSeparator } from "../../pipes/number_separator.pipe";
import { ColumnarStats, ColumnStatsData } from "../../components/stats/columnar_stats/columnar_stats.component";
import { takeUntil } from "rxjs";

@Component({
    selector: 'account_page',
    standalone: true,
    imports: [
        AccountNameBar,
        NumberSeparator,
        ColumnarStats
    ],
    templateUrl: './account.page.html',
    styleUrl: './account.page.scss'
})
export class AccountPage extends NgUnsubscriber implements OnInit {
    private readonly APP = inject(APP_SERVICE)
    private readonly ROUTE = inject(ActivatedRoute)

    account: Account = {
        id: '',
        bank_id: '',
        name: '',
        currency: 'PLN',
        apperance: {
            background_gradient: {
                top: '',
                bottom: null
            },
            stats_alternative_colors: {
                plus: null,
                minus: null
            },
            bank_logo_src: ''
        }
    }
    user_account: UserAccount = {
        id: '',
        account_id: '',
        avaible_funds: 0,
        debet: {
            limit: 0,
            interest: 0
        }
    }
    bank_name = ''
    columnar_stats_data: ColumnStatsData[] = []

    background_gradient = ''

    ngOnInit(): void {
        this.getResolverData()
        this.setAccountBackgroundGradient()
        this.reactToLeftNavButton()
    }

    private getResolverData() {
        this.ROUTE.data.subscribe(route_data => {
            this.account = route_data['account_page_data'].account
            this.user_account = route_data['account_page_data'].user_account
            this.bank_name = route_data['account_page_data'].bank_name
            this.columnar_stats_data = route_data['account_page_data'].columnar_stats_data
        })
    }

    private setAccountBackgroundGradient() {
        this.background_gradient = `linear-gradient(180deg, ${this.account.apperance.background_gradient.top} 0%, ${this.account.apperance.background_gradient.bottom ? this.account.apperance.background_gradient.bottom : this.account.apperance.background_gradient.top} 100%)`
        this.APP.APPERANCE.setStatusBarColor(this.account.apperance.background_gradient.top)
        this.APP.APPERANCE.setAppAccentColor(this.account.apperance.background_gradient.bottom !== null ? this.account.apperance.background_gradient.bottom : this.account.apperance.background_gradient.top)
    }

    private reactToLeftNavButton() {
        this.APP.STATE.nav_bar_left_button_clicked$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(() => {
            if (this.APP.STATE.last_app_location$.value !== null) {
                this.APP.navigate(this.APP.STATE.last_app_location$.value)
                this.APP.STATE.last_app_location$.next(null)
            } else {
                this.APP.navigate('home')
            }
        })
    }
}