import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { NumberSeparator } from "../../../../pipes/number_separator.pipe";
import { Currency } from "../../../../models";

@Component({
    selector: 'account_bar_debt_limit',
    standalone: true,
    imports: [
        NumberSeparator
    ],
    template: `
        <div class="LIMIT">
            @if (account_debt_limit > 0) {
                <p class="DESC">Pozostały limit debetu</p>
                <div class="LEFT_DEBT_AMOUNT">
                    <p class="AMOUNT">{{ remaining_debet | number_separator }}</p>
                    <p class="CURRENCY">{{ account_currency }}</p>
                </div>
            } @else {
                <p class="NO_DEBET">Brak debetu na rachunku</p>
            }
        </div>
    `,
    styles: `
        div.LIMIT {
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

            div.LEFT_DEBT_AMOUNT {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                justify-content: center;
                width: 100%;
                gap: 1.5vw;
                font-size: 1.76rem;
                font-weight: 500;

                p.AMOUNT {
                    font-size: 1em;
                    line-height: 1em;
                }
                
                p.CURRENCY {
                    font-size: 0.58em;
                }
            }

            p.NO_DEBET {
                font-size: .6rem;
                opacity: .5;
                font-weight: 600;
                width: 100%;
                text-align: center;
            }
        }
    `
})
export class AccountBarDebtLimit implements OnChanges {
    @Input() account_currency: Currency = 'PLN'
    @Input() account_debt_limit = 0
    @Input() account_funds_diff = 0
    @Input() account_avaible_funds = 0

    remaining_debet = 0

    ngOnChanges(changes: SimpleChanges): void {
        const account_new_avaible_funds = this.account_avaible_funds + this.account_funds_diff
        const new_left_debet_limit = this.account_debt_limit + account_new_avaible_funds
        if (account_new_avaible_funds < 0 && new_left_debet_limit > 0) {
            this.remaining_debet = new_left_debet_limit
        } else if (new_left_debet_limit < 0) {
            this.remaining_debet = 0
        } else {
            this.remaining_debet = this.account_debt_limit
        }
    }
}