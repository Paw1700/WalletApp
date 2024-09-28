import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Account, UserAccount } from "../../models";
import { APP_SERVICE } from "../../app.service";
import { ColumnStatsData } from "../../components/stats/columnar_stats/columnar_stats.component";
import { getMonthName } from "../../util/utils";

@Injectable()
export class ACCOUNT_PAGE_DATA_RESOLVER implements Resolve<AccountPageResolverData> {
    constructor(private APP: APP_SERVICE) { }

    private user_account_id: string | null = null
    private account: Account | null = null
    private user_account: UserAccount | null = null

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<AccountPageResolverData> {
        return new Promise<AccountPageResolverData>(async (resolve, reject) => {
            this.user_account_id = route.queryParamMap.get('user_account_id')

            if (this.user_account_id === null) {
                reject('user_account_id is required')
                return
            }

            try {
                this.user_account = await this.APP.USER_ACCOUNT.getOne(this.user_account_id)
                this.account = await this.APP.STORAGE.getAccount(this.user_account.account_id)
                const bank = await this.APP.STORAGE.getBank(this.account.bank_id)

                const columnar_data = (await this.getColumnarData()).reverse()

                resolve({
                    user_account: this.user_account,
                    account: this.account,
                    bank_name: bank.name,
                    columnar_stats_data: columnar_data
                })
            } catch (err) {
                this.APP.STATE.errorHappend(err as Error)
                reject(err)
            }
        })
    }

    /**
     * @description
     * Gets 4 months of transactions and returns 4 entries of columnar data.
     * Each entry contains description (month name), and two columns.
     * First column is for + transactions, second for - transactions.
     * Height of each column is calculated as % of max value.
     * Color of each column is taken from account's apperance.
     * If account's apperance is not set, uses default colors.
     * @returns Array of 4 ColumnStatsData
     */
    private getColumnarData(): Promise<ColumnStatsData[]> {
        return new Promise<ColumnStatsData[]>(async (resolve, reject) => {
            const data: ColumnStatsData[] = []

            const actual_month = new Date().getMonth()
            const data_to_convert: {
                month: number,
                plus: number,
                minus: number
            }[] = []

            for (let i = 0; i < 4; i++) {
                const loop_month = actual_month - i < 0 ? actual_month - i + 12 : actual_month - i
                const account_transactions = await this.APP.TRANSACTION.getAll({
                    user_account_id: this.user_account_id,
                    filter_date: {
                        from_to: null,
                        specific_date: {
                            day: null,
                            month: loop_month,
                            year: new Date().getFullYear()
                        }
                    },
                    filter_amount: null,
                    category_id: null,
                    receiver_id: null
                })

                data_to_convert.push({
                    month: loop_month,
                    plus: account_transactions.reduce((acc, tr) => acc + (tr.amount > 0 ? tr.amount : 0), 0),
                    minus: account_transactions.reduce((acc, tr) => acc + (tr.amount < 0 ? Math.abs(tr.amount) : 0), 0)
                })
            }

            const max_value = Math.max(...data_to_convert.map(d => d.plus), ...data_to_convert.map(d => d.minus))
            data_to_convert.forEach(d => {
                data.push({
                    description: getMonthName(d.month),
                    columns: [{
                        height_in_percent: (d.plus / max_value) * 100,
                        color: this.account?.apperance.stats_alternative_colors.plus ? this.account.apperance.stats_alternative_colors.plus : "var(--app-green)"
                    }, {
                        height_in_percent: (d.minus / max_value) * 100,
                        color: this.account?.apperance.stats_alternative_colors.minus ? this.account.apperance.stats_alternative_colors.minus : "var(--app-red)"
                    }]
                })
            })

            resolve(data)
        })
    }
}

export type AccountPageResolverData = {
    user_account: UserAccount,
    account: Account,
    bank_name: string,
    columnar_stats_data: ColumnStatsData[]
}