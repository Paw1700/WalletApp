import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { UserAccount } from "../models";
import { APP_SERVICE } from "../app.service";

@Injectable()
export class USER_ACCOUNTS_RESOLVER implements Resolve<UserAccount[]> {
    constructor(private APP: APP_SERVICE) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<UserAccount[]> {
        return this.APP.USER_ACCOUNT.getAll()
    }
}