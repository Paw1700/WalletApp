import { inject, Injectable } from "@angular/core";
import { Profile } from "../../models";
import { DB_STORES } from "../data.service";
import { DatabaseManager } from "../../util/db.driver";
import { APP_VALIDATOR } from "../validator.service";

@Injectable()
export class PROFILE_DATA_SERVICE {
    private DB = inject(DatabaseManager)
    private VALIDATOR = inject(APP_VALIDATOR)
    private readonly DB_STORE = new DB_STORES().profile

    get(): Promise<Profile> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve((await this.DB.getAllObject<Profile>(this.DB_STORE))[0])
            } catch (err) {
                reject("APP-DATA-PROFILE-GET")
            }
        })
    }

    save(profile: Profile) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                profile.id = await this.DB.GENERATE_INDEX(this.DB_STORE)
                const validation_result = this.VALIDATOR.validateUserProfile(profile)
                if (validation_result.pass) {
                    resolve(await this.DB.insertObject(this.DB_STORE, profile))
                } else {
                    reject(validation_result.errCode)
                    return
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    update(profile: Profile) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateUserProfile(profile)
                if (validation_result.pass) {
                    await this.DB.insertObject(this.DB_STORE, profile)
                    resolve()
                } else {
                    throw new Error(validation_result.errCode)
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    delete() {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.DB.deleteAllObjects(this.DB_STORE)
                resolve()
            } catch (err) {
                reject('APP-DATA-PROFILE-DELETE')
            }
        })
    }
}