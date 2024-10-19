import { inject, Injectable } from "@angular/core";
import { STORAGE_SERVICE } from "./storage.service";
import { HttpClient } from "@angular/common/http";
import { Currency } from "../models";

@Injectable()
export class CURRENCY_SERVICE {
    private STORAGE = inject(STORAGE_SERVICE)
    private HTTP = inject(HttpClient)

    getExchangeRate(from: Currency, to: Currency): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.updateCurrency()
                const from_currency = await this.STORAGE.getCurrencyData(from)
                const from_currency_rate = from_currency !== undefined ? from_currency.rate : 1
                const to_currency = await this.STORAGE.getCurrencyData(to) 
                let to_currency_rate = to_currency !== undefined ? to_currency.rate : 1
                resolve(from_currency_rate / to_currency_rate)
            } catch (err) {
                reject(err)
            }
        })
    }

    updateCurrency(currency?: Currency): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const currency_list = []
                if (currency && currency !== 'PLN') {
                    currency_list.push(currency)
                } else {
                    currency_list.push('EUR', 'USD')
                }
                for (let i = 0; i < currency_list.length; i++) {
                    const currency_code = currency_list[i]
                    const currency_data_from_DB = await this.STORAGE.getCurrencyData(currency_code as Currency)
                    // IF CURRENCY NOT AVAIBLE IN DB AND CURRENCY NEEDS UPDATED BECAUSE OF EXPIRATION
                    if (currency_data_from_DB !== undefined && !this.chechIfUpdateCurrencyPossible(currency_data_from_DB.effective_date)) {
                        break
                    }
                    const currency_data_from_NBP = await this.fetchNBPData(currency_code as Currency)
                    await this.STORAGE.saveCurrencyData({
                        id: currency_code as Currency,
                        effective_date: new Date(currency_data_from_NBP.rates[0].effectiveDate),
                        rate: currency_data_from_NBP.rates[0].mid
                    })
                }
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    private fetchNBPData(currency: Currency): Promise<NBPCurrencyData> {
        return new Promise(async (resolve, reject) => {
            try {
                if (currency === 'PLN') {
                    console.error('PLN currency is not supported by NBP API');
                    reject("APP-GENERAL")
                    return
                }
                this.HTTP.get<NBPCurrencyData>(`https://api.nbp.pl/api/exchangerates/rates/a/${currency.toLowerCase()}`, {
                    headers: {
                        "Accept": "application/json"
                    },
                    observe: "response"
                }).subscribe(data => {
                    if (data.status === 200 && data.body) {
                        resolve(data.body)
                    } else {
                        reject("APP-DATA-CURRENCY-FETCH")
                    }
                })
            } catch (err) {
                reject(err)
            }
        })
    }

    // CHECK IF CURRENCY DATA FROM NBP COULD BE NEWER (NEXT DAY AND AFTER 12:00)
    private chechIfUpdateCurrencyPossible(currency_data_effective_date: Date): boolean {
        if ((currency_data_effective_date.getTime() / 86_400_000) >= (new Date().getTime()/ 86_400_000) && new Date().getHours() >= 12) {
            return true
        }
        return false
    }
}

export type NBPCurrencyData = {
    table: string,
    currency: string,
    code: string,
    rates: {
        no: string,
        effectiveDate: string,
        mid: number
    }[]
}