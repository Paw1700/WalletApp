import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { AccountBarTitleBar } from "./components/account_bar_title_bar.component";
import { Account, Currency } from "../../../models";
import { AccountBarFunds } from "./components/account_bar_funds.component";
import { AccountBarDebtLimit } from "./components/account_bar_debt_limit.component";
import { AccountBarStats, AccountStatsData } from "./components/account_bar_stats.component";

@Component({
    selector: 'account-bar',
    standalone: true,
    imports: [
        AccountBarTitleBar,
        AccountBarFunds,
        AccountBarDebtLimit,
        AccountBarStats
    ],
    templateUrl: './account_bar.component.html',
    styleUrl: './account_bar.component.scss'
})
export class AccountBarComponent implements OnInit, OnChanges {
    @Input({ required: true }) bar_type: AccountBarComponentDisplayTypes = 'NAME_ONLY'
    @Input({ required: true }) account: Account = {
        id: "",
        bank_id: "",
        name: "",
        currency: "PLN",
        apperance: {
            background_gradient: {
                top: "",
                bottom: null
            },
            stats_alternative_colors: {
                plus: null,
                minus: null
            },
            bank_logo_src: ""
        }
    }
    @Input() account_funds_data: AccountBarFundsData = {
        avaible_funds: 0,
        debet_limit: 0,
        account_currency: "PLN"
    }
    @Input() account_funds_diff = 0
    @Input() account_stats_data: AccountStatsData = {
        plus: 0,
        minus: 0
    }

    bar_background = ''
    account_real_time_avaible_funds = 0

    ngOnInit(): void {
        this.setBarBackgroundColor()
        this.updateRealTimeAvaibleFunds()
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateRealTimeAvaibleFunds()
    }

    private setBarBackgroundColor() {
        this.bar_background = `linear-gradient(to bottom, ${this.account.apperance.background_gradient.top}, ${this.account.apperance.background_gradient.bottom !== null ? this.account.apperance.background_gradient.bottom : this.account.apperance.background_gradient.top})`
    }

    private updateRealTimeAvaibleFunds() {
        if (this.account_funds_diff !== 0) {
            this.account_real_time_avaible_funds = this.account_funds_data.avaible_funds + this.account_funds_diff
        } else {
            this.account_real_time_avaible_funds = this.account_funds_data.avaible_funds
        }
    }
}

export type AccountBarComponentDisplayTypes = 'NAME_ONLY' | 'FUNDS_ONLY' | 'WITH_STATS' | 'WITH_LIMIT'

export type AccountBarFundsData = {
    avaible_funds: number,
    debet_limit: number,
    account_currency: Currency
}