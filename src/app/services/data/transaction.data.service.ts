import { inject, Injectable } from "@angular/core";
import { DatabaseManager } from "../../util/db.driver";
import { DB_STORES } from "../data.service";
import { Transaction } from "../../models";

@Injectable()
export class TRANSACTION_DATA_SERVICE {
    private DB = inject(DatabaseManager)
    private readonly DB_STORE = new DB_STORES().transactions

    get(transaction_id: string): Promise<Transaction> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.DB.getObject<Transaction>(this.DB_STORE, transaction_id))
            } catch (err) {
                // !!! ADD ERROR CODE !!!
            }
        })
    }

    getAll(): Promise<Transaction[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.DB.getAllObject<Transaction>(this.DB_STORE))
            } catch (err) {
                // !!! ADD ERROR CODE !!!
            }
        })
    }

    save(transaction: Transaction) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                transaction.id = await this.DB.GENERATE_INDEX(this.DB_STORE)
                resolve (await this.DB.insertObject<Transaction>(this.DB_STORE, transaction))
            } catch (err) {
                // !!! ADD ERROR CODE !!!
            }
        })
    }

    update(transaction: Transaction) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                resolve (await this.DB.insertObject<Transaction>(this.DB_STORE, transaction))
            } catch (err) {
                // !!! ADD ERROR CODE !!!
            }
        })
    }

    delete(transaction_id: string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                resolve (await this.DB.deleteObject(this.DB_STORE, transaction_id))
            } catch (err) {
                // !!! ADD ERROR CODE !!!
            }
        })
    }
}