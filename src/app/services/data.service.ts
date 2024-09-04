import { inject, Injectable } from "@angular/core";
import { DatabaseManager } from "../util/db.driver";
import { PROFILE_DATA_SERVICE } from "./data/profile.data.service";
import { USER_ACCOUNT_DATA_SERVICE } from "./data/user_account.data.service";
import { TRANSACTION_DATA_SERVICE } from "./data/transaction.data.service";
import { Transaction } from "../models";
import { APP_VALIDATOR } from "./validator.service";

export class DB_STORES {
    constructor(
        public profile = 'profile',
        public accounts = 'accounts',
        public transactions = 'transactions'
    ) { }
}

export class LS_STORES {
    constructor(

    ) { }
}

@Injectable()
export class APP_DATA {
    readonly VALIDATOR = inject(APP_VALIDATOR)
    readonly PROFILE = inject(PROFILE_DATA_SERVICE)
    readonly USER_ACCOUNT = inject(USER_ACCOUNT_DATA_SERVICE)
    readonly TRANSACTION = inject(TRANSACTION_DATA_SERVICE)

    private readonly DB = inject(DatabaseManager)
    private readonly DB_NAME = 'WalletApp';
    private readonly DB_VERSION = 1;
    private readonly DB_STORES = new DB_STORES();
    private readonly LS_STORES = new LS_STORES();

    /**
     * It's start application data system. If failed it returns error code in reject.
     */
    init(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.DB.initLS(Object.getOwnPropertyNames(this.LS_STORES));
            try {
                await this.DB.initDB(
                    this.DB_NAME,
                    this.DB_VERSION,
                    Object.getOwnPropertyNames(this.DB_STORES),
                    true
                );
                resolve();
            } catch {
                reject('DB-CONNECT-ERROR');
            }
        })
    }

    /**
     * That function deletes all application data. If failed it returns error code in reject.
     */
    reset(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                this.DB.clearLS();
                await this.DB.deleteDB(this.DB_NAME);
                setTimeout(() => {
                    resolve();
                }, 500)
            } catch {
                reject('APP-RESET-ERROR');
            }
        });
    }

    newTransaction(transaction: Transaction): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateTranasaction(transaction)
                if (!validation_result.pass) {
                    reject(validation_result.errCode)
                    return
                }
                const user_account = await this.USER_ACCOUNT.getOne(transaction.user_account_id)
                const user_account_new_avaible_funds = Number(user_account.avaible_funds) + Number(transaction.amount)
                if (user_account_new_avaible_funds < 0) {
                    if (
                        user_account.debet.limit <= 0 ||
                        (user_account.debet.limit > 0 && user_account.debet.limit <= Math.abs(user_account_new_avaible_funds))
                    ) {
                        reject("APP-DATA-TRANSACTION-ADD-NOT_ENOUGH_FUNDS")
                        return
                    }
                }
                user_account.avaible_funds = Number(user_account_new_avaible_funds)
                await this.USER_ACCOUNT.update(user_account)
                await this.TRANSACTION.save(transaction)
                resolve()
            } catch (err) {
                console.error(err);
                reject(err)
            }
        })
    }

    updateTransaction(transaction: Transaction): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateTranasaction(transaction)
                if (!validation_result.pass) {
                    reject(validation_result.errCode)
                    return
                }
                const user_account = await this.USER_ACCOUNT.getOne(transaction.user_account_id)
                const user_account_old_avaible_funds = user_account.avaible_funds
                const transaction_old_amount = (await this.TRANSACTION.getOne(transaction.id)).amount
                const transaction_new_amount = transaction.amount
                let user_account_new_avaible_funds = user_account_old_avaible_funds
                if (transaction_old_amount < 0) {
                    user_account_new_avaible_funds += Math.abs(transaction_old_amount)
                } else {
                    user_account_new_avaible_funds -= transaction_old_amount
                }
                user_account_new_avaible_funds += transaction_new_amount
                if (user_account_new_avaible_funds < 0) {
                    if (
                        user_account.debet.limit <= 0 ||
                        (user_account.debet.limit > 0 && user_account.debet.limit <= Math.abs(user_account_new_avaible_funds))
                    ) {
                        reject("APP-DATA-TRANSACTION-ADD-NOT_ENOUGH_FUNDS")
                        return
                    }
                }
                user_account.avaible_funds = Number(user_account_new_avaible_funds)
                await this.USER_ACCOUNT.update(user_account)
                await this.TRANSACTION.update(transaction)
                resolve()
            } catch (err) {
                console.error(err);
                reject(err)
            }
        })
    }
}