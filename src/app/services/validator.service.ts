import { Injectable } from "@angular/core";
import { Profile } from "../models";

@Injectable()
export class APP_VALIDATOR {
    validateUserProfile(profile: Profile): boolean {
        if (profile.image === '' || profile.image === null || profile.image === undefined) {
            console.error('Profile data do not have image')
            return false
        }
        if (profile.name === '' || profile.name === null || profile.name === undefined) {
            console.error('Profile data do not have name')
            return false
        }
        if (profile.surname === '' || profile.surname === null || profile.surname === undefined) {
            console.error('Profile data do not have surname')
            return false
        }
        return true
    }
}