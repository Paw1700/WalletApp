import { Component, Input } from "@angular/core";
import { NumberSeparator } from "../../../../pipes/number_separator.pipe";
import { Currency } from "../../../../models";

@Component({
    selector: 'account_bar_funds',
    standalone: true,
    imports: [
        NumberSeparator
    ],
    template: `
        <div class="AVAIBLE_FUNDS">
            <p class="DESC">Dostępne środki</p>
            <div class="FUNDS">
                <p class="AMOUNT">{{ account_avaible_funds | number_separator }}</p>
                <p class="CURRENCY">{{ account_currency }}</p>
            </div>
        </div>
    `,
    styles: `
        div.AVAIBLE_FUNDS {
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

            div.FUNDS,
            div.VALUES {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                justify-content: center;
                width: 100%;
                gap: 1.5vw;
                font-size: 1.76rem;

                p.AMOUNT {
                    font-size: 1em;
                    font-weight: 500;
                    line-height: 1em;
                }

                p.CURRENCY {
                    font-size: 0.58em;
                    font-weight: 500;
                }
            }
        }
    `
})
export class AccountBarFunds {
    @Input({required: true}) account_avaible_funds: number = 0
    @Input({required: true}) account_currency: Currency = 'PLN'
}