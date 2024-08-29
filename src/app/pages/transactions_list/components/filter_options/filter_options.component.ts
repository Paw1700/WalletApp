import { Component, Input } from "@angular/core";
import { AccountBarComponentData } from "../../../../components/single_components/account_bar/account_bar.component";
import { AmountFilterChoose } from "./components/amount_filter_choose/amount_filter_choose.component";
import { CategorieFilterChoose } from "./components/categorie_filter_choose/categorie_filter_choose.component";
import { Category, Receiver, TransactionType } from "../../../../models";
import { TransactionTypeFilter } from "./components/transactions_type/transactions_type.component";
import { ReceiverFilter } from "./components/receiver_filter/receiver_filter.component";
import { AccountChooseByScroll } from "../../../../components/forms/account_choose_by_scroll/account_choose_by_scroll.component";
@Component({
    selector: 'filter_options',
    standalone: true,
    imports: [
    AmountFilterChoose,
    CategorieFilterChoose,
    TransactionTypeFilter,
    ReceiverFilter,
    AccountChooseByScroll
],
    templateUrl: './filter_options.component.html',
    styleUrl: './filter_options.component.scss'
})
export class FilterOptions {
    @Input({required: true}) ACCOUNTS_LIST_DATA: AccountBarComponentData[] = [] 
    @Input({required: true}) CATEGORIES_LIST: Category[] = []
    @Input({required: true}) RECEIVERS_LIST: Receiver[] = []

    transaction_type: TransactionType | null = null

    handleFilterChange(type: 'account' | 'amount' | 'category' | 'type', payload: any) {
        switch(type) {
            case "account":
            case "amount":
            case "category":
                break
            case "type":
                this.transaction_type = payload
                break
        }
    }
}