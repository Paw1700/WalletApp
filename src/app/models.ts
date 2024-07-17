export interface Bank {
    id: string,
    name: string,
    logo_src: string
}

export interface Account {
    id: string,
    bank_id: string,
    name: string,
    currency: Currency,
    apperance: {
        background_gradient: {
            top: string,
            bottom: string | null
        },
        stats_alternative_colors: {
            plus: string | null,
            minus: string | null
        },
        alternative_bank_logo_src: string | null
    }
}

export type Currency = "PLN" | "USD" | "EUR"

export interface User_Account {
    id: string,
    account_id: string,
    avaible_funds: number
}

export interface Receiver {
    id: string,
    name: string,
    logo_src: string
}

export interface Category {
    id: string,
    logo_src: {
        light: string,
        dark: string
    },
    name: string
}

export interface Transaction {
    id: string,
    date: Date,
    user_account_id: string,
    category_id: string,
    receiver_id: string,
    amount: number,
    description: string
}

export interface ScheduleTransaction {
    id: string,
    transaction: Transaction,
    interval_in_days: number
}

export interface Credit {
    id: string,
    bank_id: string,
    user_account_id: string,
    credited_funds: number,
    number_of_instalments: {
        payed: number,
        total: number
    },
    RRSO: number,
    description: string
}

export interface StockMarket {
    id: string,
    name: {
        full: string,
        shortcut: string
    },
    country_of_origin: Country 
}

export interface Country {
    id: string,
    name: string,
    flag_src: string
}

export interface UserStockMarket {
    id: string,
    stock_market_id: string,
    user_account_id: string
}

export interface UserStock {
    id: string,
    user_stock_market_id: string,
    name: {
        full: string,
        shortcut: string
    },
    amount_of_shares: number,
    price_of_share: {
        actual: number,
        when_bought: number
    }
}