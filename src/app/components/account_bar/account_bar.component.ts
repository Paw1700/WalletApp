import { Component, Input } from "@angular/core";
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
export class AccountBarComponent {
    @Input() bar_type: AccountBarComponent_Types = 'FULL'
    @Input() component_data: AccountBarComponent_Data = {
        name: "Konto dla Ciebie",
        currency: 'PLN',
        apperance: {
            background_gradient: {
                top: "#008A91",
                bottom: "#006645"
            },
            stats_alternative_colors: {
                plus: null,
                minus: "#FFF"
            },
            bank_logo_src: "/assets/account_bank_logos/credit_agricole.webp"
        },
        avaible_funds: 123456789.00,
        stats_data: {
            plus: 1234.25,
            minus: 982.45
        }
    }
    bar_background = `linear-gradient(to bottom, ${this.component_data.apperance.background_gradient.top}, ${this.component_data.apperance.background_gradient.bottom})`
    bank_logo = this.component_data.apperance.bank_logo_src
}

export interface AccountBarComponent_Data {
    name: string,
    currency: Currency,
    apperance: {
        background_gradient: {
            top: string,
            bottom: string | null
        },
        stats_alternative_colors: {
            plus: string | null,
            minus: string | null
        },
        bank_logo_src: string
    },
    avaible_funds: number,
    stats_data: {
        plus: number,
        minus: number
    } | null
}

export type AccountBarComponent_Types = 'NAME_ONLY' | 'FUNDS_ONLY' | 'FULL'