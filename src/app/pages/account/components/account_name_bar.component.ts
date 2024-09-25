import { Component, Input } from "@angular/core";
import { Account } from "../../../models";

@Component({
    selector: 'account_name_bar',
    standalone: true,
    template: `
        <div class="BANK">
            <p>{{bank_name}}</p>
            <img [src]="account.apperance.bank_logo_src" />
        </div>
        <p class="ACCOUNT_NAME">{{account.name}}</p>
    `,
    styles: `
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            gap: .5vh;
            width: 100%;

            div.BANK {
                display: flex;
                width: 100%;
                flex-direction: row;
                align-items: flex-start;
                justify-content: space-between;

                p {
                    font-size: 1.6rem;
                    font-weight: 600;
                }

                img {
                    height: 2.9vh;
                    obeject-fit: contain;
                }
            }

            p.ACCOUNT_NAME {
                font-size: 1.25rem;
                font-weight: 300;
                width: 100%;
                text-align: left;
            }
        }
    `
})
export class AccountNameBar {
    @Input({ required: true }) account: Account = {
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
    @Input() bank_name: string = ''
}