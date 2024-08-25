import { Component, Input } from "@angular/core";
import { TransactionBarComponent, TransactionBarComponentData } from "../../../../components/transaction_bar/transaction_bar.component";

@Component({
    selector: 'transaction_list',
    standalone: true,
    imports: [
        TransactionBarComponent
    ],
    templateUrl: './home_transaction_list.component.html',
    styleUrl: './home_transaction_list.component.scss'
})
export class HomeTransactionList {
    @Input({required: true}) transactions_list: TransactionBarComponentData[] = []
}