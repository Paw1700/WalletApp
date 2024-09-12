import { Component, inject, OnInit } from "@angular/core";
import { TransactionBar, TransactionBarComponentData } from "../../../../components/single_components/transaction_bar/transaction_bar.component";
import { NgUnsubscriber } from "../../../../util/ngUnsubscriber";
import { TransactionsListPageService } from "../../transactions_list.page.service";
import { trigger } from "@angular/animations";
import { ScaleInOutAnimation } from "../../../../util/animation";
import { takeUntil } from "rxjs";

@Component({
    selector: 'transactions_list',
    standalone: true,
    imports: [
        TransactionBar
    ],
    templateUrl: './transactions_list.component.html',
    styleUrl: './transactions_list.component.scss',
    animations: [
        trigger("transcation", ScaleInOutAnimation)
    ]
})
export class TransactionsList extends NgUnsubscriber implements OnInit {
    readonly PAGE_SERVICE = inject(TransactionsListPageService)

    TRANSACTIONS_LIST: TransactionBarComponentData[] = []

    ngOnInit(): void {
        this.createSubscriptions()
    }

    goToEditTransaction(transaction_id: string) {
        this.PAGE_SERVICE.goToEditTransaction(transaction_id)
    }

    private createSubscriptions() {
        this.PAGE_SERVICE.transactions_list$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(transactions => {
            this.TRANSACTIONS_LIST = transactions
        })
    }
}