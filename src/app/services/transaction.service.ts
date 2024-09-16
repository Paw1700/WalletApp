import { inject, Injectable } from "@angular/core";
import { Transaction } from "../models";
import { VALIDATOR_SERVICE } from "./validator.service";
import { STORAGE_SERVICE, TransactionsFilterOptions } from "./storage.service";

@Injectable()
export class TRANSACTION_SERVICE {
    private readonly STORAGE = inject(STORAGE_SERVICE)
    private readonly VALIDATOR = inject(VALIDATOR_SERVICE)

    getOne(transaction_id: string): Promise<Transaction> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this.STORAGE.getOneTransaction(transaction_id))
            } catch (err) {
                reject("APP-DATA-TRANSACTION-GET-ONE")
            }
        })
    }

    getAll(options: TransactionsFilterOptions | null): Promise<Transaction[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this.STORAGE.getTransactions(options))
            } catch (err) {
                reject("APP-DATA-TRANSACTION-GET")
            }
        })
    }

    save(transaction: Transaction) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateTranasaction(transaction)
                if (validation_result.pass) {
                    resolve(this.STORAGE.saveTransaction(transaction))
                } else {
                    throw new Error(validation_result.errCode)
                }
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    update(transaction: Transaction) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateTranasaction(transaction)
                if (validation_result.pass) {
                    resolve(this.STORAGE.updateTransaction(transaction))
                } else {
                    throw new Error(validation_result.errCode)
                }
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    delete(transaction_id: string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                resolve(this.STORAGE.deleteTransaction(transaction_id))
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }
}

