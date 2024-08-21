import { Injectable } from "@angular/core";
import { Profile, Transaction, UserAccount, ValidationResult } from "../models";

@Injectable()
export class APP_VALIDATOR {
    validateUserProfile(profile: Profile): ValidationResult {
        if (!this.hasStringValue(profile.id)) {
            return {pass: false, errCode: 'APP-DATA-PROFILE-SAVE-ID'}
        }
        if (!this.hasStringValue(profile.image)) {
            return {pass: false, errCode: 'APP-DATA-PROFILE-SAVE-IMAGE'}
        }
        if (!this.hasStringValue(profile.name)) {
            return {pass: false, errCode: 'APP-DATA-PROFILE-SAVE-NAME'}
        }
        if (!this.hasStringValue(profile.surname)) {
            return {pass: false, errCode: 'APP-DATA-PROFILE-SAVE-SURNAME'}
        }
        return {pass: true}
    }

    validateUserAccount(user_account: UserAccount): ValidationResult {
        if (!this.hasStringValue(user_account.account_id)) {
            return {pass: false, errCode: "APP-DATA-USER_ACCOUNT-SAVE-ID"}
        }
        if (!this.hasNumberValue(user_account.avaible_funds)) {
            return {pass: false, errCode: "APP-DATA-USER_ACCOUNT-SAVE-AVAIBLE_FUNDS"}
        }
        if (!this.hasNumberValue(user_account.debet.interest)) {
            return {pass: false, errCode: "APP-DATA-USER_ACCOUNT-SAVE-INTEREST_RATE"}
        }
        if (!this.hasNumberValue(user_account.debet.limit)) {
            return {pass: false, errCode: "APP-DATA-USER_ACCOUNT-SAVE-INTEREST_LIMIT"}
        }
        return {pass: true}
    }

    validateTranasaction(transaction: Transaction): ValidationResult {
        if (!this.hasNumberValue(transaction.amount, false)) {
            return {pass: false, errCode: 'APP-DATA-TRANSACTION-SAVE-AMOUNT'}
        }
        if (!this.hasStringValue(transaction.category_id)) {
            return {pass: false, errCode: 'APP-DATA-TRANSACTION-SAVE-ID'}
        }
        if (!this.hasDateValue(transaction.date)) {
            return {pass: false, errCode: 'APP-DATA-TRANSACTION-SAVE-DATE'}
        }
        if (!this.hasStringValue(transaction.receiver_id)) {
            return {pass: false, errCode: 'APP-DATA-TRANSACTION-SAVE-RECEIVER'}
        }
        if (!this.hasStringValue(transaction.user_account_id)) {
            return {pass: false, errCode: 'APP-DATA-TRANSACTION-SAVE-UA_ID'}
        }
        return {pass: true}
    }

    private hasStringValue(data: string): boolean {
        if (data === null || data === undefined || data === '') {
            return false
        }
        return true
    }

    private hasNumberValue(data: number, allowZero: boolean = true) {
        if (data === null || data === undefined || (!allowZero && data === 0)) {
            return false
        }
        return true
    }

    private hasDateValue(data: Date) {
        if (data === undefined || data === null) {
            return false
        } 
        return true
    }
}

