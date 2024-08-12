import { inject, Injectable } from "@angular/core";
import { DatabaseManager } from "../../util/db.driver";
import { DB_STORES } from "../data.service";
import { UserAccount } from "../../models";

@Injectable()
export class USER_ACCOUNT_DATA_SERVICE {
    private DB = inject(DatabaseManager)
    private readonly DB_STORE = new DB_STORES().accounts

    getAll(): Promise<UserAccount[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.DB.getAllObject<UserAccount>(this.DB_STORE))
            } catch (err) {
                // !!! ADD ERROR CODE !!!
            }
        })
    }

    getOne(user_account_id: string): Promise<UserAccount> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.DB.getObject<UserAccount>(this.DB_STORE, user_account_id))
            } catch (err) {
                // !!! ADD ERROR CODE !!!
            }
        })
    }

    save(user_account: UserAccount): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                user_account.id = await this.DB.GENERATE_INDEX(this.DB_STORE)
                await this.DB.insertObject(this.DB_STORE, user_account)
                resolve()
            } catch (err) {
                // !!! ADD ERROR CODE !!!
                console.error(err);
                reject()
            }
        })
    }

    update(user_account: UserAccount): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                if (user_account.id === '' || user_account.id === null || user_account.id === undefined) {
                    reject('No ID of user account!')
                    return
                }
                await this.DB.insertObject(this.DB_STORE, user_account)
                resolve()
            } catch (err) {
                // !!! ADD ERROR CODE !!!
                console.error(err);
                reject()
            }
        })
    }

    delete(user_account_id: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.DB.deleteObject(this.DB_STORE, user_account_id)
                resolve()
            } catch (err) {
                // !!! ADD ERROR CODE !!!
            }
        })
    }
}