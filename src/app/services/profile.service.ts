import { inject, Injectable } from "@angular/core";
import { Profile } from "../models";
import { VALIDATOR_SERVICE } from "./validator.service";
import { STORAGE_SERVICE } from "./storage.service";

@Injectable()
export class PROFILE_SERVICE {
    private VALIDATOR = inject(VALIDATOR_SERVICE)
    private STORAGE = inject(STORAGE_SERVICE)

    get(): Promise<Profile> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this.STORAGE.getProfile())
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    save(profile: Profile) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateUserProfile(profile)
                if (validation_result.pass) {
                    resolve(this.STORAGE.saveProfile(profile))
                } else {
                    throw new Error(validation_result.errCode)
                }
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    update(profile: Profile) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateUserProfile(profile)
                if (validation_result.pass) {
                    resolve(this.STORAGE.updateProfile(profile))
                } else {
                    throw new Error(validation_result.errCode)
                }
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    delete() {
        return new Promise<void>(async (resolve, reject) => {
            try {
                resolve(this.STORAGE.deleteProfile())
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }
}