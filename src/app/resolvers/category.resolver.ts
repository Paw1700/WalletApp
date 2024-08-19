import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Category } from "../models";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CATEGORY_RESOLVER implements Resolve<Category[]> {
    constructor(private HTTP: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Category[]> {
        return new Promise((resolve) => {
            this.HTTP.get<Category[]>('/assets/data/categories.json').subscribe( d => {
                resolve(d)
            })
        })
    }
}