export interface Profile {
    id: string,
    name: string,
    surname: string,
    image: string
}

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
        bank_logo_src: string
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
    name: string,
    logo_src: {
        light: string,
        dark: string
    }
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

export type Transaction_Type = 'income' | 'expense'

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

export type AppLocations = 'home' | 'bootstrap' | 'app_first_configuration' | 'app_data_update' | 'add_account' | 'add_transaction' | 'accounts_list' | 'settings' | 'credits_list' | 'add_credit' | 'account_page' | 'credit_page'

export type AppLocationListItem = {
    name: string,
    active: boolean
}