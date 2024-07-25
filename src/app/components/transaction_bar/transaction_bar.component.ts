import { Component, Input } from "@angular/core";
import { NumberSeparator } from "../../pipes/number_separator.pipe";
import { Category, Currency } from "../../models";

@Component({
    selector: "transaction-bar",
    standalone: true,
    imports: [NumberSeparator],
    templateUrl: './transaction_bar.component.html',
    styleUrl: './transaction_bar.component.scss'
})
export class TransactionBarComponent {
    @Input() component_data: TransactionBarComponent_Data = {
        transaction_id: 'XXX',
        category: {
            id: "GAS",
            name: "Paliwo",
            logo_src: {
                light: "/assets/category_icons/gasoline_light.webp",
                dark: "/assets/category_icons/gasoline_dark.webp"
            }
        },
        description: 'Paliwo',
        receiver_name: 'Orlen',
        transaction_price: -350.98,
        transaction_currency: 'PLN'
    }
}

export type TransactionBarComponent_Data = {
    transaction_id: string,
    category: Category,
    description: string,
    receiver_name: string,
    transaction_price: number,
    transaction_currency: Currency
}