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

    getAll(options: TransactionsFilterOptions | null): Promise<Transaction[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let all_transactions = await this.DB.getAllObject<Transaction>(this.DB_STORE)
                if (options) {
                    if (options.user_account_id !== null) {
                        const value = options.user_account_id
                        all_transactions = all_transactions.filter(tr => tr.user_account_id === value)
                    }
                    if (options.filter_date) {
                        if (options.filter_date.from !== null) {
                            const value = options.filter_date.from
                            all_transactions = all_transactions.filter(tr => tr.date.getTime() >= value.getTime())
                        }
                        if (options.filter_date.to !== null) {
                            const value = options.filter_date.to
                            all_transactions = all_transactions.filter(tr => tr.date.getTime() <= value.getTime())
                        }
                    }
                    if (options.category_id !== null) {
                        const value = options.category_id
                        all_transactions = all_transactions.filter(tr => tr.category_id === value)
                    }
                    if (options.receiver_id !== null) {
                        const value = options.receiver_id
                        all_transactions = all_transactions.filter(tr => tr.receiver_id === value)
                    }
                    if (options.filter_amount !== null) {
                        if (options.filter_amount.from !== null) {
                            const value = options.filter_amount.from
                            all_transactions = all_transactions.filter(tr => tr.amount >= value)
                        }
                        if (options.filter_amount.to !== null) {
                            const value = options.filter_amount.to
                            all_transactions = all_transactions.filter(tr => tr.amount <= value)
                        }
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
                    resolve(await this.DB.insertObject<Transaction>(this.DB_STORE, transaction))
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
                    resolve(await this.DB.insertObject<Transaction>(this.DB_STORE, transaction))
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
                resolve(await this.DB.deleteObject(this.DB_STORE, transaction_id))
            } catch (err) {
                reject("APP-DATA-TRANSACTION-DELETE")
            }
        })
    }
}

export type TransactionsFilterOptions = {
    user_account_id: string | null,
    filter_date: TransactionsFilterDateFromToOptions | null,
    category_id: string | null,
    receiver_id: string | null,
    filter_amount: TransactionsFilterNumberFromToOptions | null
}

export type TransactionsFilterNumberFromToOptions = {
    from: number | null,
    to: number | null
}
export type TransactionsFilterDateFromToOptions = {
    from: Date | null,
    to: Date | null
}

export type TransactionsFilterOptionsList = 'user_account_id' | 'filter_date' | 'category_id' | 'receiver_id' | 'filter_amount'