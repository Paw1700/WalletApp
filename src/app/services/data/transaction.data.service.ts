import { inject, Injectable } from "@angular/core";
import { DatabaseManager } from "../../util/db.driver";
import { DB_STORES } from "../data.service";
import { Transaction } from "../../models";
import { APP_VALIDATOR } from "../validator.service";

@Injectable()
export class TRANSACTION_DATA_SERVICE {
    private DB = inject(DatabaseManager)
    private readonly DB_STORE = new DB_STORES().transactions
    private readonly VALIDATOR = inject(APP_VALIDATOR)

    getOne(transaction_id: string): Promise<Transaction> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.DB.getObject<Transaction>(this.DB_STORE, transaction_id))
            } catch (err) {
                reject("APP-DATA-TRANSACTION-GET-ONE")
            }
        })
    }

    getAll(user_account_id?: string, filter_date?: {from?: Date, to?: Date}, category_id?: string, receiver_id?: string, filter_amount?: {from: number, to: number}): Promise<Transaction[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let all_transactions = await this.DB.getAllObject<Transaction>(this.DB_STORE)
                if (user_account_id) {
                    all_transactions = all_transactions.filter(tr => tr.user_account_id === user_account_id)
                } 
                if (filter_date) {
                    if (filter_date.from) {
                        all_transactions = all_transactions.filter(tr => tr.date >= filter_date.from!)
                    }
                    if (filter_date.to) {
                        all_transactions = all_transactions.filter(tr => tr.date <= filter_date.to!)
                    }
                }
                if (category_id) {
                    all_transactions = all_transactions.filter(tr => tr.category_id = category_id)
                }
                if (receiver_id) {
                    all_transactions = all_transactions.filter(tr => tr.receiver_id = receiver_id)
                }
                if (filter_amount) {
                    if (filter_amount.from) {
                        all_transactions = all_transactions.filter(tr => tr.amount >= filter_amount.from)
                    }
                    if (filter_amount.to) {
                        all_transactions = all_transactions.filter(tr => tr.amount <= filter_amount.to)
                    }
                }
                resolve(all_transactions)
            } catch (err) {
                reject("APP-DATA-TRANSACTION-GET")
            }
        })
    }

    save(transaction: Transaction) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                transaction.id = await this.DB.GENERATE_INDEX(this.DB_STORE)
                const validation_result = this.VALIDATOR.validateTranasaction(transaction)
                if (validation_result.pass) {
                    resolve (await this.DB.insertObject<Transaction>(this.DB_STORE, transaction))
                } else {
                    throw new Error(validation_result.errCode)
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    update(transaction: Transaction) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateTranasaction(transaction)
                if (validation_result.pass) {
                    resolve (await this.DB.insertObject<Transaction>(this.DB_STORE, transaction))
                } else {
                    throw new Error(validation_result.errCode)
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    delete(transaction_id: string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.DB.RELEASE_INDEX(this.DB_STORE, transaction_id)
                resolve (await this.DB.deleteObject(this.DB_STORE, transaction_id))
            } catch (err) {
                reject("APP-DATA-TRANSACTION-DELETE")
            }
        })
    }
}