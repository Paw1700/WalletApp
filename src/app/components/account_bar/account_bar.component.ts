import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Account, Bank, Currency } from "../../models";
import { NgStyle } from "@angular/common";
import { NumberSeparator } from "../../pipes/number_separator.pipe";

@Component({
    selector: 'account-bar',
    standalone: true,
    imports: [NgStyle, NumberSeparator],
    templateUrl: './account_bar.component.html',
    styleUrl: './account_bar.component.scss'
})
export class AccountBarComponent implements OnChanges{
    @Input() bar_type: AccountBarComponent_Types = 'FULL'
    @Input() account: Account = {
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
    }
    @Input() account_funds_data: AccountFundsData = {
        avaible_funds: 0,
        stats_data: {
            plus: 0,
            minus: 0
        }
    }
    bar_background = `linear-gradient(to bottom, ${this.account.apperance.background_gradient.top}, ${this.account.apperance.background_gradient.bottom})`
    bank_logo = this.account.apperance.bank_logo_src

    ngOnChanges(changes: SimpleChanges): void {
        this.bar_background = `linear-gradient(to bottom, ${this.account.apperance.background_gradient.top}, ${this.account.apperance.background_gradient.bottom})`
        this.bank_logo = this.account.apperance.bank_logo_src
    }
}

export interface AccountFundsData {
    avaible_funds: number,
    stats_data: {
        plus: number,
        minus: number
    }
}

export type AccountBarComponent_Types = 'NAME_ONLY' | 'FUNDS_ONLY' | 'FULL'