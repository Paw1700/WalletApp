import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Transaction } from "../models";
import { APP_SERVICE } from "../app.service";

@Injectable()
export class TRANSACTIONS_RESOLVER implements Resolve<Transaction[]>{
    constructor(private APP: APP_SERVICE) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Transaction[]> {
        return new Promise((resolve) => {
            resolve(this.APP.DATA.TRANSACTION.getAll(null))
        })
    }
}