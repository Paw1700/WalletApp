import { Component, Input } from "@angular/core";
import { AccountBarComponent, AccountBarComponentData } from "../../../../components/account_bar/account_bar.component";
import { AccountFilter } from "./components/account_filter_choose/account_filter_choose.component";
import { AmountFilterChoose } from "./components/amount_filter_choose/amount_filter_choose.component";
import { CategorieFilterChoose } from "./components/categorie_filter_choose/categorie_filter_choose.component";
import { Category } from "../../../../models";
import { TransactionTypeFilter } from "./components/transactions_type/transactions_type.component";
@Component({
    selector: 'filter_options',
    standalone: true,
    imports: [
    AccountBarComponent,
    AccountFilter,
    AmountFilterChoose,
    CategorieFilterChoose,
    TransactionTypeFilter
],
    templateUrl: './filter_options.component.html',
    styleUrl: './filter_options.component.scss'
})
export class FilterOptions {
    @Input({required: true}) ACCOUNTS_BAR_DATA: AccountBarComponentData[] = [] 
    @Input({required: true}) CATEGORIES_LIST: Category[] = []

    handleFilterChange(type: 'account' | 'amount' | 'category' | 'type', payload: any) {
        switch(type) {
            case "account":
            case "amount":
            case "category":
            case "type":
        }
    }
}