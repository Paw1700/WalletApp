import { inject, Injectable } from "@angular/core";
import { Profile } from "../../models";
import { DB_STORES } from "../data.service";
import { DatabaseManager } from "../../util/db.driver";

@Injectable()
export class PROFILE_DATA_SERVICE {
    private DB = inject(DatabaseManager)
    private readonly DB_STORE = new DB_STORES().profile

    get(): Promise<Profile> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve((await this.DB.getAllObject<Profile>(this.DB_STORE))[0])
            } catch (err) {
                // !!! ADD ERROR CODE !!!
            }
        })
    }

    save(profile: Profile) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                profile.id = await this.DB.GENERATE_INDEX(this.DB_STORE)
                await this.DB.insertObject(this.DB_STORE, profile)
                resolve()
            } catch (err) {
                // !!! ADD ERROR CODE !!!
                reject()
            }
        })
    }

    update(profile: Profile) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.DB.insertObject(this.DB_STORE, profile)
                resolve()
            } catch (err) {
                // !!! ADD ERROR CODE !!!
                reject()
            }
        })
    }

    delete() {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.DB.deleteAllObjects(this.DB_STORE)
                resolve()
            } catch (err) {
                // !!! ADD ERROR CODE !!!
            }
        })
    }
}