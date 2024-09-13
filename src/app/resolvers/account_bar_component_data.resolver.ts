import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { AccountBarComponentData } from "../components/single_components/account_bar/account_bar.component";
import { APP_SERVICE } from "../app.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ACCOUNT_BAR_COMPONENT_DATA_LIST_RESOLVER implements Resolve<AccountBarComponentData[]> {
    constructor(private APP: APP_SERVICE) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<AccountBarComponentData[]> {
        return new Promise<AccountBarComponentData[]>(async (resolve) => {
            const user_accounts = await this.APP.USER_ACCOUNT.getAll()
            const accounts = await this.APP.STORAGE.getAccounts()
            const account_bar_component_data_list: AccountBarComponentData[] = []
            user_accounts.forEach( us_acc => {
                account_bar_component_data_list.push({
                    user_account_id: us_acc.id,
                    account: accounts.filter(acc => acc.id === us_acc.account_id)[0],
                    funds_data: {
                        avaible_funds: us_acc.avaible_funds,
                        stats_data: {
                            plus: 0,
                            minus: 0
                        },
                        limit_number: us_acc.debet.limit
                    }
                })
            })
            resolve(account_bar_component_data_list)
        })
    }
}