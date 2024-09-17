import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { APP_SERVICE } from "../app.service";
import { Injectable } from "@angular/core";
import { AccountsCarouselListItem } from "../pages/home/components/accounts-carousel/accounts-carousel.component";

@Injectable()
export class ACCOUNT_BAR_CAROUSEL_LIST_RESOLVER implements Resolve<AccountsCarouselListItem[]> {
    constructor(private APP: APP_SERVICE) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<AccountsCarouselListItem[]> {
        return new Promise<AccountsCarouselListItem[]>(async (resolve) => {
            const user_accounts = await this.APP.USER_ACCOUNT.getAll()
            const accounts = await this.APP.STORAGE.getAccounts()
            const account_bar_component_data_list: AccountsCarouselListItem[] = []
            for (let i = 0; i < user_accounts.length; i++) {
                const us_acc = user_accounts[i]
                account_bar_component_data_list.push({
                    user_account_id: us_acc.id,
                    account: accounts.filter(acc => acc.id === us_acc.account_id)[0],
                    stats_data: await this.APP.USER_ACCOUNT.getAccountFundsStats(us_acc.id),
                    account_funds_data: {
                        avaible_funds: us_acc.avaible_funds,
                        debet_limit: us_acc.debet.limit
                    }
                })
            }
            resolve(account_bar_component_data_list)
        })
    }
}