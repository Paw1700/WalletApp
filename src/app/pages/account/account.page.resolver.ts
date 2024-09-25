import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Account, UserAccount } from "../../models";
import { APP_SERVICE } from "../../app.service";

@Injectable()
export class ACCOUNT_PAGE_DATA_RESOLVER implements Resolve<AccountPageResolverData> {
    constructor(private APP: APP_SERVICE) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<AccountPageResolverData> {
        return new Promise<AccountPageResolverData>(async (resolve, reject) => {
            const user_account_id = route.queryParamMap.get('user_account_id')
            
            if (user_account_id === null) {
                reject('user_account_id is required')
                return
            }
            
            try {
                const user_account = await this.APP.USER_ACCOUNT.getOne(user_account_id)
                const account = await this.APP.STORAGE.getAccount(user_account.account_id)
                const bank = await this.APP.STORAGE.getBank(account.bank_id)
                resolve({
                    user_account,
                    account,
                    bank_name: bank.name
                })
            } catch (err) {
                this.APP.STATE.errorHappend(err as Error)
                reject(err)
            }
        })
    }
}

export type AccountPageResolverData = {
    user_account: UserAccount,
    account: Account,
    bank_name: string
}