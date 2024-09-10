import { Injectable } from "@angular/core";
import { APP_SERVICE } from "../../../app.service";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { AccountBarComponentData } from "../../../components/single_components/account_bar/account_bar.component";
import { HttpClient } from "@angular/common/http";
import { Account, UserAccount } from "../../../models";

@Injectable()
export class ACCOUNTS_CAROUSEL_RESOLVER implements Resolve<AccountBarComponentData[]> {
    constructor(private APP: APP_SERVICE, private HTTP: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<AccountBarComponentData[]> {
        return new Promise<AccountBarComponentData[]>(async (resolve) => {
            let accounts_data: Account[] = await this.getAccounts()
            let user_accounts_data: UserAccount[] = await this.APP.USER_ACCOUNT.getAll()
            const accounts_carouse_data: AccountBarComponentData[] = []
            user_accounts_data.forEach(us_acc => {
                const account_data = accounts_data.filter(acc => acc.id === us_acc.account_id)[0]
                accounts_carouse_data.push({
                    user_account_id: us_acc.id,
                    account: account_data,
                    funds_data: {
                        avaible_funds: us_acc.avaible_funds,
                        stats_data: { plus: 0, minus: 0 }
                    }
                })
            })
            resolve(accounts_carouse_data)
        })
    }

    private getAccounts() {
        return new Promise<Account[]>(resolve => {
            this.HTTP.get<Account[]>('/assets/data/accounts.json').subscribe(data => {
                resolve(data)
            })
        })
    }
}