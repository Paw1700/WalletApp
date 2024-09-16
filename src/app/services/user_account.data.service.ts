import { inject, Injectable } from "@angular/core";
import { VALIDATOR_SERVICE } from "./validator.service";
import { STORAGE_SERVICE } from "./storage.service";
import { UserAccount } from "../models";

@Injectable()
export class USER_ACCOUNT_SERVICE {
    private readonly VALIDATOR = inject(VALIDATOR_SERVICE)
    private readonly STORAGE = inject(STORAGE_SERVICE)

    getAll(): Promise<UserAccount[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this.STORAGE.getAllUserAccounts())
            } catch (err) {
                reject("APP-DATA-USER_ACCOUNT-GET")
            }
        })
    }

    getOne(user_account_id: string): Promise<UserAccount> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this.STORAGE.getUserAccount(user_account_id))
            } catch (err) {
                reject("APP-DATA-USER_ACCOUNT-GET")
            }
        })
    }

    save(user_account: UserAccount): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateUserAccount(user_account)
                if (validation_result.pass) {
                    resolve(this.STORAGE.saveUserAccount(user_account))
                } else {
                    throw new Error(validation_result.errCode)
                }
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    update(user_account: UserAccount): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateUserAccount(user_account)
                if (validation_result.pass) {
                    resolve(this.STORAGE.updateUserAccount(user_account))
                } else {
                    throw new Error(validation_result.errCode)
                }
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    delete(user_account_id: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this.STORAGE.deleteUserAccount(user_account_id))
            } catch (err) {
                reject("APP-DATA-USER_ACCOUNT-DELETE")
            }
        })
    }

    changeAvaibleAmount(user_account_id: string, change: number) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const user_account = await this.getOne(user_account_id)
                const old_avaible_amount = user_account.avaible_funds
                const new_avaible_amount = old_avaible_amount + change
                user_account.avaible_funds = new_avaible_amount
                if (this.checkIfCanPay(user_account)) {
                    await this.update(user_account)
                    resolve()
                } else {
                    throw new Error('APP-DATA-TRANSACTION-ADD-NOT_ENOUGH_FUNDS')
                }
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    private checkIfCanPay(user_account: UserAccount): boolean {
        if (
            user_account.avaible_funds < 0 &&
            Math.abs(user_account.avaible_funds) > user_account.debet.limit
        ) {
            return false
        } else {
            return true
        }
    }
}