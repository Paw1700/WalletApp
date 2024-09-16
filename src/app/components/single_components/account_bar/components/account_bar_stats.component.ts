import { Component, Input } from "@angular/core";
import { AccountStatsAlternativeColors, Currency } from "../../../../models";
import { NumberSeparator } from "../../../../pipes/number_separator.pipe";

@Component({
    selector: 'account_bar_stats',
    standalone: true,
    imports: [
        NumberSeparator
    ],
    template: `
        <div class="STATS">
            <p class="DESC">W ciągu ostatnich 30 dni</p>
            <div class="VALUES">
                <div [style.color]="account_stats_alternative.plus !== null ? account_stats_alternative.plus : 'var(--app-green)'"
                    class="PLUS">
                    <p class="AMOUNT">{{ account_stats_data.plus| number_separator }}</p>
                    <p class="CURRENCY">{{ account_currency }}</p>
                </div>
                <div [style.color]="account_stats_alternative.minus !== null ? account_stats_alternative.minus : 'var(--app-red)'"
                    class="MINUS">
                    <p class="AMOUNT">{{ account_stats_data.minus | number_separator }}</p>
                    <p class="CURRENCY">{{ account_currency }}</p>
                </div>
            </div>
        </div>
    `,
    styles: `
        div.STATS {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            gap: 1.17vh;

            p.DESC {
                width: 100%;
                text-align: left;
                font-size: 0.7rem;
                font-weight: 300;
            }

            div.VALUES {
                display: flex;
                flex-direction: row;
                width: 100%;
                font-size: 0.7rem;
                justify-content: space-around;

                div.PLUS,
                div.MINUS {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-end;
                    gap: .5vw;
                }
            }
        }
    `
})
export class AccountBarStats {
    @Input() account_stats_alternative: AccountStatsAlternativeColors = {
        plus: null,
        minus: null
    }
    @Input() account_currency: Currency = 'PLN'
    @Input() account_stats_data: AccountStatsData = {
        plus: 0,
        minus: 0
    }
}

export type AccountStatsData = {
    plus: number,
    minus: number
}