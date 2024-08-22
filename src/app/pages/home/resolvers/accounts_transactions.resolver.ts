import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { APP_SERVICE } from "../../../app.service";
import { TransactionBarComponentData } from "../../../components/transaction_bar/transaction_bar.component";
import { Category, Receiver } from "../../../models";
import { HttpClient } from "@angular/common/http";
import { DAYS_OFFSET } from "../../../constants";

@Injectable()
export class ACCOUNTS_TRANSACTIONS_RESOLVER implements Resolve<TransactionBarComponentData[]> {
    constructor(private APP: APP_SERVICE, private HTTP: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<TransactionBarComponentData[]> {
        return new Promise(async (resolve) => {
            const accounts_transactions: TransactionBarComponentData[] = []
            const CATEGORIES_LIST = await this.getCategoryList()
            const RECEIVERS_LIST = await this.getReceiverList()
            const transactions = await this.APP.DATA.TRANSACTION.getAll({filter_date: {from: new Date().getTime() - DAYS_OFFSET * 30}})
            transactions.sort((a, b) => {
                if (a.date > b.date) {
                    return -1
                } else if (a.date < b.date) {
                    return 1
                } else {
                    return 0
                }
            })
            transactions.forEach(tr => {
                accounts_transactions.push({
                    transaction_id: tr.id,
                    user_account_id: tr.user_account_id,
                    category: CATEGORIES_LIST.filter(ct => ct.id === tr.category_id)[0],
                    description: tr.description,
                    receiver: RECEIVERS_LIST.filter(r => r.id === tr.receiver_id)[0],
                    transaction_price: tr.amount,
                    transaction_currency: 'PLN'
                })
            })
            resolve(accounts_transactions)
        })
    }

    private getCategoryList() {
        return new Promise<Category[]>(resolve => {
            this.HTTP.get<Category[]>('/assets/data/categories.json').subscribe(data => { resolve(data) })
        })
    }

    private getReceiverList() {
        return new Promise<Receiver[]>(resolve => {
            this.HTTP.get<Receiver[]>('/assets/data/receivers.json').subscribe(data => { resolve(data) })
        })
    }
}