import { Component, Input, OnInit } from "@angular/core";
import { Account } from "../../models";
import { NgStyle } from "@angular/common";
import { NumberSeparator } from "../../pipes/number_separator.pipe";

@Component({
    selector: 'account-bar',
    standalone: true,
    imports: [NgStyle, NumberSeparator],
    templateUrl: './account_bar.component.html',
    styleUrl: './account_bar.component.scss'
})
export class AccountBarComponent implements OnInit {
    @Input() bar_type: AccountBarComponentDisplayTypes = 'FULL'
    @Input() bar_data: AccountBarComponentData = {
        user_account_id: null,
        account: {
            id: "KON-RNE-ALI-ANK",
            bank_id: "ALI-ANK",
            name: "Konto Elitarne",
            currency: "PLN",
            apperance: {
                background_gradient: {
                    top: "#4B4C4C",
                    bottom: "#030303"
                },
                stats_alternative_colors: {
                    plus: null,
                    minus: null
                },
                bank_logo_src: "/assets/banks_logos/alior_bank.webp"
            }
        },
        funds_data: null
    }
    bar_background = ''
    bank_logo = ''

    ngOnInit(): void {
        this.setBarStyle()
    }
    
    private setBarStyle() {
        this.bar_background = `linear-gradient(to bottom, ${this.bar_data.account.apperance.background_gradient.top}, ${this.bar_data.account.apperance.background_gradient.bottom !== null ? this.bar_data.account.apperance.background_gradient.bottom : this.bar_data.account.apperance.background_gradient.top})`
        this.bank_logo = this.bar_data.account.apperance.bank_logo_src
    }
}

export type AccountBarComponentDisplayTypes = 'NAME_ONLY' | 'FUNDS_ONLY' | 'FULL'

export type AccountFundsData = {
    avaible_funds: number,
    stats_data: {
        plus: number,
        minus: number
    }
}

export type AccountBarComponentData = {
    user_account_id: string | null,
    account: Account,
    funds_data: AccountFundsData | null
}