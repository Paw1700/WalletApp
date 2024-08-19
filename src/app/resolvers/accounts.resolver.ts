import { Injectable } from "@angular/core";
import { Account } from "../models";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ACCOUNTS_RESOLVER implements Resolve<Account[]>{
    constructor(private HTTP: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Account[]> {
        return new Promise((resolve) => {
            this.HTTP.get<Account[]>('/assets/data/accounts.json').subscribe(d => {
                resolve(d)
            })  
        })
    }
}