import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TransactionBar, TransactionBarComponentData } from "../../../../components/single_components/transaction_bar/transaction_bar.component";

@Component({
    selector: 'transaction_list',
    standalone: true,
    imports: [
        TransactionBar
    ],
    templateUrl: './home_transaction_list.component.html',
    styleUrl: './home_transaction_list.component.scss'
})
export class HomeTransactionList {
    @Input({required: true}) transactions_list: TransactionBarComponentData[] = []
    @Output() clicked_transaction_id = new EventEmitter<string>()
}