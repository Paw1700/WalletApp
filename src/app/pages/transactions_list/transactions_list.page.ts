import { Component, inject } from "@angular/core";
import { FilterOptions } from "./components/filter_options/filter_options.component";
import { ActivatedRoute } from "@angular/router";
import { AccountBarComponentData } from "../../components/account_bar/account_bar.component";
import { UserAccount, Account } from "../../models";

@Component({
    selector: 'transactions_list_page',
    standalone: true,
    imports: [
        FilterOptions
    ],
    templateUrl: './transactions_list.page.html',
    styleUrl: './transactions_list.page.scss'
})
export class TransactionsListPage {
    private readonly ROUTE = inject(ActivatedRoute)

    ACCOUNTS_BAR_DATA_LIST: AccountBarComponentData[] = []

    ngOnInit(): void {
        this.readResolverDataAndPopulateAccountsBarData()
    }

    private readResolverDataAndPopulateAccountsBarData() {
        this.ROUTE.data.subscribe( resolver_data => {
            const user_accounts_list = resolver_data['user_accounts_data'] as UserAccount[]
            const accounts_data = resolver_data['accounts_data'] as Account[]
            user_accounts_list.forEach( usa => {
                this.ACCOUNTS_BAR_DATA_LIST.push({
                    user_account_id: usa.account_id,
                    account: accounts_data.filter(acc => acc.id === usa.account_id)[0],
                    funds_data: {
                        avaible_funds: usa.avaible_funds,
                        stats_data: null
                    }
                })
            })
        })
    }
}