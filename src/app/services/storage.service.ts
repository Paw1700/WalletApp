import { inject, Injectable } from "@angular/core";
import { DatabaseManager } from "../util/db.driver";
import { Account, Category, Profile, Receiver, Transaction, UserAccount } from "../models";
import { HttpClient } from "@angular/common/http";

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
export class STORAGE_SERVICE {
    private readonly DB = inject(DatabaseManager)
    private readonly HTTP = inject(HttpClient)
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

    /**
     * @returns user profile data 
     */
    getProfile(): Promise<Profile> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve((await this.DB.getAllObject<Profile>(this.DB_STORES.profile))[0])
            } catch (err) {
                reject("APP-DATA-PROFILE-GET")
            }
        })
    }

    /**
     * @param profile before verified data without setted id
     */
    saveProfile(profile: Profile): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                if (profile.id) {
                    console.error('Profile should not contain id here!')
                    throw new Error("APP-DATA-PROFILE-SAVE")
                }
                profile.id = await this.DB.GENERATE_INDEX(this.DB_STORES.profile)
                if (this.idValidation(profile.id)) {
                    resolve(await this.DB.insertObject(this.DB_STORES.profile, profile))
                } else {
                    console.error('Profile do not contain id!')
                    throw new Error("APP-DATA-PROFILE-SAVE")
                }
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    /**
     * @param profile data of existing profile to update
     */
    updateProfile(profile: Profile): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                if (this.idValidation(profile.id)) {
                    console.error('Profile should contain id here!')
                    throw new Error("APP-DATA-PROFILE-SAVE")
                }
                await this.DB.insertObject(this.DB_STORES.profile, profile)
                resolve()
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    /**
     * Deletes profile's data 
     */
    deleteProfile(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.DB.deleteAllObjects(this.DB_STORES.profile)
                resolve()
            } catch (err) {
                reject('APP-DATA-PROFILE-DELETE')
            }
        })
    }

    getOneTransaction(transaction_id: string): Promise<Transaction> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.DB.getObject<Transaction>(this.DB_STORES.transactions, transaction_id))
            } catch (err) {
                reject("APP-DATA-TRANSACTION-GET-ONE")
            }
        })
    }

    getTransactions(filter_options: TransactionsFilterOptions | null): Promise<Transaction[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let all_transactions = await this.DB.getAllObject<Transaction>(this.DB_STORES.transactions)
                if (filter_options) {
                    if (filter_options.user_account_id !== null) {
                        const value = filter_options.user_account_id
                        all_transactions = all_transactions.filter(tr => tr.user_account_id === value)
                    }
                    if (filter_options.filter_date) {
                        if (filter_options.filter_date.from !== null) {
                            const value = filter_options.filter_date.from
                            all_transactions = all_transactions.filter(tr => tr.date.getTime() >= value.getTime())
                        }
                        if (filter_options.filter_date.to !== null) {
                            const value = filter_options.filter_date.to
                            all_transactions = all_transactions.filter(tr => tr.date.getTime() <= value.getTime())
                        }
                    }
                    if (filter_options.category_id !== null) {
                        const value = filter_options.category_id
                        all_transactions = all_transactions.filter(tr => tr.category_id === value)
                    }
                    if (filter_options.receiver_id !== null) {
                        const value = filter_options.receiver_id
                        all_transactions = all_transactions.filter(tr => tr.receiver_id === value)
                    }
                    if (filter_options.filter_amount !== null) {
                        if (filter_options.filter_amount.from !== null) {
                            const value = filter_options.filter_amount.from
                            all_transactions = all_transactions.filter(tr => tr.amount >= value)
                        }
                        if (filter_options.filter_amount.to !== null) {
                            const value = filter_options.filter_amount.to
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

    saveTransaction(transaction: Transaction): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                transaction.id = await this.DB.GENERATE_INDEX(this.DB_STORES.transactions)
                if (this.idValidation(transaction.id)) {
                    resolve(await this.DB.insertObject<Transaction>(this.DB_STORES.transactions, transaction))
                } else {
                    throw new Error("APP-DATA-TRANSACTION-SAVE")
                }
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    updateTransaction(transaction: Transaction): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                if (this.idValidation(transaction.id)) {
                    resolve(await this.DB.insertObject<Transaction>(this.DB_STORES.transactions, transaction))
                } else {
                    throw new Error("APP-DATA-TRANSACTION-SAVE")
                }
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    deleteTransaction(transaction_id: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.DB.RELEASE_INDEX(this.DB_STORES.transactions, transaction_id)
                resolve(await this.DB.deleteObject(this.DB_STORES.transactions, transaction_id))
            } catch (err) {
                reject("APP-DATA-TRANSACTION-DELETE")
            }
        })
    }

    getAllUserAccounts(): Promise<UserAccount[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.DB.getAllObject<UserAccount>(this.DB_STORES.accounts))
            } catch (err) {
                reject("APP-DATA-USER_ACCOUNT-GET")
            }
        })
    }

    getUserAccount(user_account_id: string): Promise<UserAccount> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.DB.getObject<UserAccount>(this.DB_STORES.accounts, user_account_id))
            } catch (err) {
                reject("APP-DATA-USER_ACCOUNT-GET")
            }
        })
    }

    saveUserAccount(user_account: UserAccount): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                user_account.id = await this.DB.GENERATE_INDEX(this.DB_STORES.accounts)
                if (this.idValidation(user_account.id)) {
                    resolve(await this.DB.insertObject(this.DB_STORES.accounts, user_account))
                } else {
                    throw new Error("APP-DATA-USER_ACCOUNT-SAVE")
                }
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    updateUserAccount(user_account: UserAccount): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.idValidation(user_account.id)) {
                    resolve(await this.DB.insertObject(this.DB_STORES.accounts, user_account))
                } else {
                    throw new Error("APP-DATA-USER_ACCOUNT-SAVE")
                }
            } catch (err) {
                reject((err as Error).message)
            }
        })
    }

    deleteUserAccount(user_account_id: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.DB.RELEASE_INDEX(this.DB_STORES.accounts, user_account_id)
                await this.DB.deleteObject(this.DB_STORES.accounts, user_account_id)
                resolve()
            } catch (err) {
                reject("APP-DATA-USER_ACCOUNT-DELETE")
            }
        })
    }

    getReceivers(): Promise<Receiver[]> {
        return new Promise(resolve => {
            this.HTTP.get<Receiver[]>('/assets/data/receivers.json').subscribe( list => {
                resolve(list)
            })
        })
    }

    getCategorie(category_id: string): Promise<Category> {
        return new Promise(async (resolve) => {
            resolve((await this.getCategories()).filter(cat => cat.id === category_id)[0])
        })
    }

    getCategories(): Promise<Category[]> {
        return new Promise(resolve => {
            this.HTTP.get<Category[]>('/assets/data/categories.json').subscribe( list => {
                resolve(list)
            })
        })
    }

    getAccount(account_id: string): Promise<Account> {
        return new Promise(async resolve => {
            resolve((await this.getAccounts()).filter(acc => acc.id === account_id)[0])
        })
    }

    getAccounts(): Promise<Account[]> {
        return new Promise(resolve => {
            this.HTTP.get<Account[]>('/assets/data/accounts.json').subscribe( list => {
                resolve(list)
            })
        })
    }

    private idValidation(data: string): boolean {
        if (data === null || data === undefined || data === '') {
            return false
        }
        return true
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