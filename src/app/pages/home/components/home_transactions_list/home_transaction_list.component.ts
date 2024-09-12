import { Component, EventEmitter, inject, OnInit } from "@angular/core";
import { TransactionBar, TransactionBarComponentData } from "../../../../components/single_components/transaction_bar/transaction_bar.component";
import { ScrollSideBarOption, ScrollSideOptions } from "../../../../components/embeddable_components/scroll_side_options/scroll_side_options.component";
import { HomePageService } from "../../home.page.service";
import { NgUnsubscriber } from "../../../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";
import { Loader } from "../../../../components/UI/loader/loader.component";
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'transaction_list',
    standalone: true,
    imports: [
        TransactionBar,
        ScrollSideOptions,
        Loader
    ],
    templateUrl: './home_transaction_list.component.html',
    styleUrl: './home_transaction_list.component.scss'
})
export class HomeTransactionList extends NgUnsubscriber implements OnInit {
    readonly PAGE_SERVICE = inject(HomePageService)
    readonly scroll_side_options: ScrollSideBarOption = {color: 'red', width_in_percent: 25, round_edges: true, text: 'Usuń', image: null, return_value: null}

    transactions_list: TransactionBarComponentData[] | null = null

    ngOnInit(): void {
        this.subscribeToTransactionBarList()
    }

    handleSideOptionClicked(transaction_id: string) {
        this.PAGE_SERVICE.showConfirmBox(true)
        this.PAGE_SERVICE.transaction_id_to_delete$.next(transaction_id)
    }

    handleTransactionClicked(transaction_id: string) {
        this.PAGE_SERVICE.goToEditTransaction(transaction_id)
    }

    private subscribeToTransactionBarList() {
        this.PAGE_SERVICE.transaction_bar_list$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe( transaction_bar_list => {
            this.transactions_list = transaction_bar_list
        })
    }
}

export type ClickedTransactionEmittedValue = {
    type: 'edit' | 'delete',
    id: string
}