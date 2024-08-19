import { Injectable } from "@angular/core";
import { Receiver } from "../models";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RECEIVERS_RESOLVER implements Resolve<Receiver[]>{
    constructor(private HTTP: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Receiver[]> {
        return new Promise((resolve) => {
            this.HTTP.get<Receiver[]>('/assets/data/receivers.json').subscribe(d => {
                resolve(d)
            })  
        })
    }
}