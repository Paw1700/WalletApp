import { Component, inject, OnInit } from "@angular/core";
import { TransactionBar, TransactionBarComponentData } from "../../../../components/single_components/transaction_bar/transaction_bar.component";
import { ScrollSideBarOption, ScrollSideOptions } from "../../../../components/embeddable_components/scroll_side_options/scroll_side_options.component";
import { HomePageService } from "../../home.page.service";
import { NgUnsubscriber } from "../../../../util/ngUnsubscriber";
import { takeUntil } from "rxjs";
import { Loader } from "../../../../components/UI/loader/loader.component";
import { trigger } from "@angular/animations";
import { ScaleInOutAnimation } from "../../../../util/animation";
import { SideOptionsComponent, SideOptionsComponentData } from "../../../../components/embeddable_components/side_options/side_options.component";

@Component({
    selector: 'transaction_list',
    standalone: true,
    imports: [
        TransactionBar,
        ScrollSideOptions,
        Loader,
        SideOptionsComponent
    ],
    templateUrl: './home_transaction_list.component.html',
    styleUrl: './home_transaction_list.component.scss',
    animations: [
        trigger('transaction', ScaleInOutAnimation)
    ]
})
export class HomeTransactionList extends NgUnsubscriber implements OnInit {
    readonly PAGE_SERVICE = inject(HomePageService)
    readonly scroll_side_options: ScrollSideBarOption = { color: 'red', width_in_percent: 25, round_edges: true, text: 'Usuń', image: null, return_value: null }
    readonly side_options: SideOptionsComponentData[] = [{ color: 'var(--app-accent)', text: "EDYTUJ", image: null, return_value: 'edit' }, { color: 'red', text: "USUŃ", image: null, return_value: 'delete' }]

    transactions_list: TransactionBarComponentData[] | null = null

    ngOnInit(): void {
        this.subscribeToTransactionBarList()
    }

    handleSideOptionClicked(option_number: number, transaction_id: any) {
        switch(option_number) {
            case 1:
                this.PAGE_SERVICE.goToEditTransaction(transaction_id)
                break
            case 2:
                this.PAGE_SERVICE.showConfirmBox(true)
                this.PAGE_SERVICE.transaction_id_to_delete$.next(transaction_id)
                break
        }
    }

    private subscribeToTransactionBarList() {
        this.PAGE_SERVICE.transaction_bar_list$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(transaction_bar_list => {
            this.transactions_list = transaction_bar_list
        })
    }
}

export type ClickedTransactionEmittedValue = {
    type: 'edit' | 'delete',
    id: string
}