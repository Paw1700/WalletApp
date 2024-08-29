import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { AccountBarComponentData } from "../../../components/single_components/account_bar/account_bar.component";
import { APP_SERVICE } from "../../../app.service";
import { HttpClient } from "@angular/common/http";
import { Account } from "../../../models";

@Injectable()
export class ACCOUNT_BAR_RESOLVER_FOR_ADDING_TRANSACTION_PAGE implements Resolve<AccountBarComponentData>{
    constructor(private APP: APP_SERVICE, private HTTP: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<AccountBarComponentData> {
        return new Promise(async (resolve) => {
            const user_account_id = route.queryParamMap.get('id')
            if (user_account_id === null) {
                console.error("Cannot get user account id from route!");
                return
            }
            const user_account = await this.APP.DATA.USER_ACCOUNT.getOne(user_account_id)
            resolve({
                user_account_id: user_account_id, 
                account: await this.getAccount(user_account.account_id), 
                funds_data: {
                    avaible_funds: user_account.avaible_funds, 
                    stats_data: {
                        plus: 0, 
                        minus:0
                    }
                }
            })
        })
    }

    private getAccount(account_id: string) {
        return new Promise<Account>((resolve) => {
            this.HTTP.get<Account[]>("/assets/data/accounts.json").subscribe( data => {
                resolve(data.filter(ac => ac.id === account_id)[0])
            })
        })
    }
}