import { Injectable } from "@angular/core";
import { Profile, Transaction, UserAccount, ValidationResult } from "../models";

@Injectable()
export class APP_VALIDATOR {
    validateUserProfile(profile: Profile): ValidationResult {
        if (profile.id === '' || profile.id === undefined || profile.id === null) {
            return {pass: false, errCode: 'APP-DATA-PROFILE-SAVE-ID'}
        }
        if (profile.image === '' || profile.image === null || profile.image === undefined) {
            return {pass: false, errCode: 'APP-DATA-PROFILE-SAVE-IMAGE'}
        }
        if (profile.name === '' || profile.name === null || profile.name === undefined) {
            return {pass: false, errCode: 'APP-DATA-PROFILE-SAVE-NAME'}
        }
        if (profile.surname === '' || profile.surname === null || profile.surname === undefined) {
            return {pass: false, errCode: 'APP-DATA-PROFILE-SAVE-SURNAME'}
        }
        return {pass: true}
    }

    validateUserAccount(user_account: UserAccount): boolean {
        if (user_account.account_id === '' || user_account.account_id === null || user_account.account_id === undefined) {
            console.error('User Account dont have account id')
            return false
        }
        if (user_account.avaible_funds === null || user_account.avaible_funds === undefined) {
            console.error('User Account dont have start funds')
            return false
        }
        if (user_account.debet.interest === null || user_account.debet.interest === undefined) {
            console.error('User Account dont have debet interest')
            return false
        }
        if (user_account.debet.limit === null || user_account.debet.limit === undefined) {
            console.error('User Account dont have debet limit')
            return false
        }
        return true
    }

    validateTranasaction(transaction: Transaction): boolean {
        if (transaction.amount === null || transaction.amount === undefined ) {
            console.error('Transaction dont have amount')
            return false
        }
        if (transaction.category_id === null || transaction.category_id === undefined || transaction.category_id === '') {
            console.error('Transaction dont have cateogry id')
            return false
        }
        if (transaction.date === null || transaction.date === undefined) {
            console.error('Transaction dont have date')
            return false
        }
        if (transaction.receiver_id === null || transaction.receiver_id === undefined || transaction.receiver_id === '') {
            console.error('Transaction dont have receiver id')
            return false
        }
        if (transaction.user_account_id === null || transaction.user_account_id === undefined || transaction.user_account_id === '') {
            console.error('Transaction dont have user account id');
            return false
        }
        return true
    }

    private hasStringValue(data: string): boolean {
        if (data === null || data === undefined || data === '') {
            return false
        }
        return true
    }
}

