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