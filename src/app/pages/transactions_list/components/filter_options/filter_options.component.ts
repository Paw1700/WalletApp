import { Component, inject, OnInit } from "@angular/core";
import { TransactionTypeChooseBubble } from "../../../../components/forms/transactions_type_choose_bubble/transactions_type_choose_bubble.component";
import { AmountFilterChooseBubble } from "../../../../components/forms/amount_filter_choose_bubble/amount_filter_choose_bubble.component";
import { ReceiverChooseBubble } from "../../../../components/forms/receiver_choose_bubble/receiver_choose_bubble.component";
import { CategoryChooseBubble } from "../../../../components/forms/categorie_choose_bubble/categorie_choose_bubble.component";
import { TransactionsListPageService } from "../../transactions_list.page.service";
import { NgUnsubscriber } from "../../../../util/ngUnsubscriber";
import { Category, Receiver,  } from "../../../../models";
import { TransactionsFilterOptionsList } from "../../../../services/storage.service";
import { takeUntil } from "rxjs";

@Component({
    selector: 'filter_options',
    standalone: true,
    imports: [
        TransactionTypeChooseBubble,
        AmountFilterChooseBubble,
        ReceiverChooseBubble,
        CategoryChooseBubble
    ],
    templateUrl: './filter_options.component.html',
    styleUrl: './filter_options.component.scss'
})
export class FilterOptions extends NgUnsubscriber implements OnInit {
    readonly PAGE_SERVICE = inject(TransactionsListPageService)

    CATEGORIES_LIST: Category[] = []
    RECEIVERS_LIST: Receiver[] = []
    receiver_choose_bubble_open = false

    ngOnInit(): void {
        this.createSubscriptions()
    }

    handleFilterChange(type: TransactionsFilterOptionsList | 'type', payload: any) {
        this.PAGE_SERVICE.setFilterOption(type, payload)
    }

    reactToReceiverBubbleOpenStateChange(e: boolean) {
        this.receiver_choose_bubble_open = e
    }

    private createSubscriptions() {
        this.PAGE_SERVICE.categories_list$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(categories => {
            this.CATEGORIES_LIST = categories
        })
        this.PAGE_SERVICE.receivers_list$.pipe(takeUntil(this.ngUnsubscriber$)).subscribe(receivers => {
            this.RECEIVERS_LIST = receivers
        })
    }
}