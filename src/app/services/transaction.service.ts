import { inject, Injectable } from "@angular/core";
import { Transaction, FundsTransaction } from "../models";
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
                reject(new Error("APP-DATA-TRANSACTION-GET-ONE"))
            }
        })
    }

    getOneFundsTransaction(transaction_id: string): Promise<FundsTransaction> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this.STORAGE.getOneFundsTransaction(transaction_id))
            } catch (err) {
                reject(new Error("APP-DATA-TRANSACTION-GET-ONE"))
            }
        })
    }

    getAll(options: TransactionsFilterOptions | null): Promise<Transaction[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this.STORAGE.getTransactions(options))
            } catch (err) {
                reject(new Error("APP-DATA-TRANSACTION-GET"))
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
                reject(err)
            }
        })
    }

    saveFundsTransaction(funds_transaction: FundsTransaction) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateFundsTransaction(funds_transaction)
                if (validation_result.pass) {
                    resolve(this.STORAGE.saveFundsTransaction(funds_transaction))
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
                    resolve(this.STORAGE.updateTransaction(transaction))
                } else {
                    throw new Error(validation_result.errCode)
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    updateFundsTransaction(funds_transaction: FundsTransaction) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const validation_result = this.VALIDATOR.validateFundsTransaction(funds_transaction)
                if (validation_result.pass) {
                    resolve(this.STORAGE.updateFundsTransaction(funds_transaction))
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
                resolve(this.STORAGE.deleteTransaction(transaction_id))
            } catch (err) {
                reject(err)
            }
        })
    }

    deleteFundsTransaction(transaction_id: string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                resolve(this.STORAGE.deleteFundsTransaction(transaction_id))
            } catch (err) {
                reject(err)
            }
        })
    }
}

