import { inject, Injectable } from "@angular/core";
import { DatabaseManager } from "../util/db.driver";
import { PROFILE_DATA_SERVICE } from "./data/profile.data.service";
import { USER_ACCOUNT_DATA_SERVICE } from "./data/user_account.data.service";
import { TRANSACTION_DATA_SERVICE } from "./data/transaction.data.service";

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
}