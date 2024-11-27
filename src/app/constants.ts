import { Transaction } from "./models"

export const DAYS_OFFSET = (24 * 60 * 60 * 1000)

export const SORTING_TRANSACTIONS_BY_DATE = ((a: Transaction, b: Transaction) => {
    if (a.date > b.date) {
        return -1
    } else if (a.date < b.date) {
        return 1
    } else {
        return 0
    }
})

export const SLIDE_TO_LEFT_ANIMATION_PAGES = 'accounts_list => add_account, home => add_transaction, transactions_list => add_transaction, home => account, transactions_list => account, accounts_list => account, * => transfer_funds'

export const SLIDE_TO_RIGHT_ANIMATION_PAGES = 'add_account => accounts_list, add_transaction => home, add_transaction => transactions_list, account => home, account => transactions_list, account => accounts_list, transfer_funds => *'