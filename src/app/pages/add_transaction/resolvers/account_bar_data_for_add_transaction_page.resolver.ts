import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { AccountBarComponentData } from "../../../components/single_components/account_bar/account_bar.component";
import { APP_SERVICE } from "../../../app.service";
import { HttpClient } from "@angular/common/http";
import { Account, UserAccount } from "../../../models";

@Injectable()
export class ACCOUNT_BAR_RESOLVER_FOR_ADDING_TRANSACTION_PAGE implements Resolve<AccountBarComponentData> {
    constructor(private APP: APP_SERVICE, private HTTP: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<AccountBarComponentData> {
        return new Promise(async (resolve) => {
            const user_account_id = route.queryParamMap.get('usa_id')
            const transaction_id = route.queryParamMap.get('tr_id')
            let user_account: UserAccount | null = null
            if (user_account_id !== null && transaction_id === null) {
                user_account = await this.APP.USER_ACCOUNT.getOne(user_account_id)
            } else if (user_account_id === null && transaction_id !== null) {
                const transaction = await this.APP.TRANSACTION.getOne(transaction_id)
                user_account = await this.APP.USER_ACCOUNT.getOne(transaction.user_account_id)
            } else {
                console.error("Cannot get user account id from route!");
                return
            }
            if (user_account) {
                resolve({
                    user_account_id: user_account.id,
                    account: await this.getAccount(user_account.account_id),
                    funds_data: {
                        avaible_funds: user_account.avaible_funds,
                        stats_data: {
                            plus: 0,
                            minus: 0
                        },
                        limit_number: user_account.debet.limit
                    }
                })
            }
        })
    }

    private getAccount(account_id: string) {
        return new Promise<Account>((resolve) => {
            this.HTTP.get<Account[]>("/assets/data/accounts.json").subscribe(data => {
                resolve(data.filter(ac => ac.id === account_id)[0])
            })
        })
    }
}