import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { APP_SERVICE } from "../../../app.service";
import { HttpClient } from "@angular/common/http";
import { Account, UserAccount } from "../../../models";
import { AddTransactionPageAccountData } from "../add_transaction.page";

@Injectable()
export class ACCOUNT_BAR_RESOLVER_FOR_ADDING_TRANSACTION_PAGE implements Resolve<AddTransactionPageAccountData> {
    constructor(private APP: APP_SERVICE, private HTTP: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<AddTransactionPageAccountData> {
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
                const account = await this.APP.STORAGE.getAccount(user_account.account_id)
                resolve({
                    account: account,
                    funds_data: {
                        avaible_funds: user_account.avaible_funds,
                        debet_limit: user_account.debet.limit,
                        account_currency: account.currency
                    }
                })
            }
        })
    }
}