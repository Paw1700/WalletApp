import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TransactionBar, TransactionBarComponentData } from "../../../../components/single_components/transaction_bar/transaction_bar.component";
import { ScrollSideBarOption, ScrollSideOptions } from "../../../../components/embeddable_components/scroll_side_options/scroll_side_options.component";

@Component({
    selector: 'transaction_list',
    standalone: true,
    imports: [
        TransactionBar,
        ScrollSideOptions
    ],
    templateUrl: './home_transaction_list.component.html',
    styleUrl: './home_transaction_list.component.scss'
})
export class HomeTransactionList {
    @Input({required: true}) transactions_list: TransactionBarComponentData[] = []
    @Output() clicked_transaction = new EventEmitter<ClickedTransactionEmittedValue>()

    scroll_side_options: ScrollSideBarOption = {color: 'red', width_in_percent: 25, round_edges: true, text: 'Usuń', image: null, return_value: null}
}

export type ClickedTransactionEmittedValue = {
    type: 'edit' | 'delete',
    id: string
}