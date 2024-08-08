import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable()
export class APP_APPERANCE {
    dark_mode_state$ = new BehaviorSubject<boolean>(false)

    /**
     * Restarts app apperance settings to default
     */
    restart() {
        this.setAppAccentColor(null)
        this.setStatusBarColor(null)
        this.watchForDarkModeChange()
    }

    /**
     * It's changes in app color themes depending on given color string if given only null it's reset app colors to default
     * @param theme_color color which will be used for theme color in app
     * @param accent_color color which will be used for accent color in app
     */
    setAppAccentColor(color: string | null) {
        if (color === null) {
            const style = getComputedStyle(document.documentElement)
            let color = style.getPropertyValue('--app-default-accent').trim()
            document.documentElement.style.setProperty('--app-accent', color)
        } else {
            document.documentElement.style.setProperty('--app-accent', color)
        }
    }

    /**
     * It's changes color of browser tab color on given color. If null sets use app-theme color
     * @param color you want to set in
     */
    setStatusBarColor(color: string | null) {
        document.querySelector("meta[name=theme-color]")?.setAttribute('content', color ? color : getComputedStyle(document.documentElement).getPropertyValue('--app-theme').trim())
    }

    /**
     * Checking if at moment of running function browser is in dark mode
     * @returns If browser is in dark mode return true, otherwise false
     */
    checkIsDarkMode(): boolean {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true
        } else {
            return false
        }
    }

    /**
     * It's starts watching for dark mode state change in browser. Initially it also uses {@link checkIsDarkMode()} to set state for {@link dark_mode_state$} subject
     */
    watchForDarkModeChange(): void {
        this.dark_mode_state$.next(this.checkIsDarkMode())
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                this.dark_mode_state$.next(true)
            } else {
                this.dark_mode_state$.next(false)
            }
        })
    }
}