import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AccountBarComponentData } from "../../components/single_components/account_bar/account_bar.component";
import { UserAccount, Account, Category, Receiver } from "../../models";
import { AccountChooseByScroll } from "../../components/forms/account_choose_by_scroll/account_choose_by_scroll.component";
import { TransactionTypeChooseBubble } from "../../components/forms/transactions_type_choose_bubble/transactions_type_choose_bubble.component";
import { AmountFilterChooseBubble } from "../../components/forms/amount_filter_choose_bubble/amount_filter_choose_bubble.component";
import { ReceiverChooseBubble } from "../../components/forms/receiver_choose_bubble/receiver_choose_bubble.component";
import { CategoryChooseBubble } from "../../components/forms/categorie_choose_bubble/categorie_choose_bubble.component";

@Component({
    selector: 'transactions_list_page',
    standalone: true,
    imports: [
        AccountChooseByScroll,
        TransactionTypeChooseBubble,
        AmountFilterChooseBubble,
        ReceiverChooseBubble,
        CategoryChooseBubble
    ],
    templateUrl: './transactions_list.page.html',
    styleUrl: './transactions_list.page.scss'
})
export class TransactionsListPage {
    private readonly ROUTE = inject(ActivatedRoute)

    ACCOUNTS_BAR_DATA_LIST: AccountBarComponentData[] = []
    CATEGORIES_LIST: Category[] = []
    RECEIVERS_LIST: Receiver[] = []

    receiver_choose_bubble_open = false

    reactToReceiverBubbleOpenStateChange(e: boolean) {
        this.receiver_choose_bubble_open = e
    }

    ngOnInit(): void {
        this.readResolverDataAndPopulateData()
    }

    private readResolverDataAndPopulateData() {
        this.ROUTE.data.subscribe( resolver_data => {
            this.CATEGORIES_LIST = resolver_data['categories_list']
            this.RECEIVERS_LIST = resolver_data['receivers_list']
            this.populateAccountsBarData(resolver_data['user_accounts_data'] as UserAccount[], resolver_data['accounts_data'] as Account[])
        })
    }

    private populateAccountsBarData(user_accounts_list: UserAccount[], accounts_data: Account[]) {
        user_accounts_list.forEach( usa => {
            this.ACCOUNTS_BAR_DATA_LIST.push({
                user_account_id: usa.account_id,
                account: accounts_data.filter(acc => acc.id === usa.account_id)[0],
                funds_data: {
                    avaible_funds: usa.avaible_funds
                }
            })
        })
    }
}