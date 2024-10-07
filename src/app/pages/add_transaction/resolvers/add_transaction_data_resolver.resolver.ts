import { Injectable } from "@angular/core";
import { Category, Receiver, Transaction } from "../../../models";
import { AccountBarWithLimitData } from "../../../components/single_components/account_bar/account_bar.component";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { APP_SERVICE } from "../../../app.service";

@Injectable()
export class ADD_TRANSACTION_PAGE_DATA_RESOLVER implements Resolve<AddTransactionPageData> {
    constructor(private APP: APP_SERVICE) { }

    private transaction: Transaction | null = null
    private user_account_bar_data: AccountBarWithLimitData = {
        user_account_id: '',
        account: {
            id: '',
            bank_id: '',
            name: '',
            currency: "PLN",
            apperance: {
                background_gradient: {
                    top: "",
                    bottom: null
                },
                stats_alternative_colors: {
                    plus: null,
                    minus: null
                },
                bank_logo_src: ''
            }
        },
        funds_data: {
            avaible_funds: 0,
            debet_limit: 0
        }
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<AddTransactionPageData> {
        return new Promise(async (resolve, reject) => {
            try {
                this.resetResolverData()
                const receivers_from_storage = await this.APP.STORAGE.getReceivers()
                const categories_from_storage = await this.APP.STORAGE.getCategories()
                
                const user_account_id_from_url = route.queryParamMap.get('usa_id')
                const transaction_id_from_url = route.queryParamMap.get('tr_id')

                if (user_account_id_from_url !== null && transaction_id_from_url === null) {
                    await this.getDataAcordingToUserAccountID(user_account_id_from_url)
                } else if (user_account_id_from_url === null && transaction_id_from_url !== null) {
                    await this.getDataAccordingToTransactionID(transaction_id_from_url)
                } else {
                    throw new Error('APP-RESOLVER-LACK_OF_URL_DATA')
                }

                resolve({
                    receivers: receivers_from_storage,
                    categories: categories_from_storage,
                    transaction: this.transaction,
                    user_account_bar_data: this.user_account_bar_data
                })
            } catch (err) {
                console.error(err);
                this.APP.STATE.errorHappend(err as Error)
                reject()
            }
        })
    }

    private getDataAcordingToUserAccountID(user_account_id: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const user_account = await this.APP.USER_ACCOUNT.getOne(user_account_id)
                this.user_account_bar_data.user_account_id = user_account_id
                this.user_account_bar_data.account = await this.APP.STORAGE.getAccount(user_account.account_id)
                this.user_account_bar_data.funds_data = {
                    avaible_funds: user_account.avaible_funds,
                    debet_limit: user_account.debet.limit
                }
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    private getDataAccordingToTransactionID(transaction_id: string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                this.transaction = await this.APP.TRANSACTION.getOne(transaction_id)
                const user_account = await this.APP.USER_ACCOUNT.getOne(this.transaction.user_account_id)
                this.user_account_bar_data.user_account_id = this.transaction.user_account_id
                this.user_account_bar_data.account = await this.APP.STORAGE.getAccount(user_account.account_id)
                this.user_account_bar_data.funds_data = {
                    avaible_funds: user_account.avaible_funds,
                    debet_limit: user_account.debet.limit
                }
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    private resetResolverData(): void {
        this.user_account_bar_data = {
            user_account_id: '',
            account: {
                id: '',
                bank_id: '',
                name: '',
                currency: "PLN",
                apperance: {
                    background_gradient: {
                        top: "",
                        bottom: null
                    },
                    stats_alternative_colors: {
                        plus: null,
                        minus: null
                    },
                    bank_logo_src: ''
                }
            },
            funds_data: {
                avaible_funds: 0,
                debet_limit: 0
            }
        }
        this.transaction = null
    }
}

export type AddTransactionPageData = {
    receivers: Receiver[],
    categories: Category[],
    transaction: Transaction | null,
    user_account_bar_data: AccountBarWithLimitData
}