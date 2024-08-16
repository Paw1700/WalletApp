import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { APP_SERVICE } from "../app.service";
import { Profile } from "../models";

@Injectable()
export class PROFILE_RESOLVER implements Resolve<Profile> {
    constructor(private APP: APP_SERVICE) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Profile> {
        return this.APP.DATA.PROFILE.get()
    }
}