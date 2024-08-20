import { inject, Injectable } from "@angular/core";
import { DatabaseManager } from "../../util/db.driver";
import { DB_STORES } from "../data.service";
import { UserAccount } from "../../models";
import { APP_VALIDATOR } from "../validator.service";

@Injectable()
export class USER_ACCOUNT_DATA_SERVICE {
    private readonly VALIDATOR = inject(APP_VALIDATOR)
    private DB = inject(DatabaseManager)
    private readonly DB_STORE = new DB_STORES().accounts

    getAll(): Promise<UserAccount[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.DB.getAllObject<UserAccount>(this.DB_STORE))
            } catch (err) {
                reject("APP-DATA-USER_ACCOUNT-GET")
            }
        })
    }

    getOne(user_account_id: string): Promise<UserAccount> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.DB.getObject<UserAccount>(this.DB_STORE, user_account_id))
            } catch (err) {
                reject("APP-DATA-USER_ACCOUNT-GET")
            }
        })
    }

    save(user_account: UserAccount): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                user_account.id = await this.DB.GENERATE_INDEX(this.DB_STORE)
                const validation_result = this.VALIDATOR.validateUserAccount(user_account)
                if (validation_result.pass) {
                    resolve(await this.DB.insertObject(this.DB_STORE, user_account))
                } else {
                    throw new Error(validation_result.errCode)
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    update(user_account: UserAccount): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateUserAccount(user_account)
                if (validation_result.pass) {
                    resolve(await this.DB.insertObject(this.DB_STORE, user_account))
                } else {
                    throw new Error(validation_result.errCode)
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    delete(user_account_id: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.DB.RELEASE_INDEX(this.DB_STORE, user_account_id)
                await this.DB.deleteObject(this.DB_STORE, user_account_id)
                resolve()
            } catch (err) {
                reject("APP-DATA-USER_ACCOUNT-DELETE")
            }
        })
    }
}