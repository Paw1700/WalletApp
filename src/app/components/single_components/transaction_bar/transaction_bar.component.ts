import { Component, Input } from "@angular/core";
import { NumberSeparator } from "../../../pipes/number_separator.pipe";
import { Category, Currency, Receiver } from "../../../models";

@Component({
    selector: "transaction_bar",
    standalone: true,
    imports: [
        NumberSeparator
    ],
    templateUrl: './transaction_bar.component.html',
    styleUrl: './transaction_bar.component.scss'
})
export class TransactionBar {
    @Input() component_data: TransactionBarComponentData = {
        transaction_id: 'XXX',
        user_account_id: 'XXX',
        category: {
            id: "GAS",
            name: "Paliwo",
            logo_src: {
                light: "/assets/category_icons/gasoline_light.webp",
                dark: "/assets/category_icons/gasoline_dark.webp"
            }
        },
        description: 'Paliwo',
        receiver: {
            id: "",
            name: "Orlen",
            logo_src: ""
        },
        transaction_price: -350.98,
        transaction_currency: 'PLN'
    }
}

export type TransactionBarComponentData = {
    transaction_id: string,
    user_account_id: string,
    category: Category,
    description: string,
    receiver: Receiver,
    transaction_price: number,
    transaction_currency: Currency
}