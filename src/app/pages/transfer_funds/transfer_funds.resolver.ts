import { Injectable } from "@angular/core";
import { Account } from "../../models";
import { AccountBarFundsData } from "../../components/single_components/account_bar/account_bar.component";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { APP_SERVICE } from "../../app.service";

@Injectable()
export class TRANSFER_FUNDS_PAGE_RESOLVER implements Resolve<TransferFundsPageResolvedData> {
    constructor(private APP: APP_SERVICE) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<TransferFundsPageResolvedData> {
        return new Promise(async (resolve, reject) => {
            const user_accounts = await this.APP.USER_ACCOUNT.getAll()
            const accounts = await this.APP.STORAGE.getAccounts()
            const return_data: TransferFundsPageResolvedData = {
                user_accounts: []
            }
            for (let i = 0; i < user_accounts.length; i++) {
                const us_acc = user_accounts[i]
                const acc = accounts.find(acc => acc.id === us_acc.account_id)
                if (!acc) {
                    console.error(`Not find account for ${us_acc.account_id}!`)
                    reject()
                    return
                }
                return_data.user_accounts.push({
                    user_account_id: us_acc.id,
                    account: acc,
                    funds_data: {
                        avaible_funds: us_acc.avaible_funds,
                        debet_limit: us_acc.debet.limit
                    }
                })
            }
            resolve(return_data)
        })
    }
}

export interface TransferFundsPageResolvedData {
    user_accounts: TransferFundsPageUserAccounts[]
}

export interface TransferFundsPageUserAccounts {
    user_account_id: string,
    account: Account,
    funds_data: AccountBarFundsData
}