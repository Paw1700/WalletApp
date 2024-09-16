import { Component, Input } from "@angular/core";

@Component({
    selector: 'account_bar_title_bar',
    standalone: true,
    template: `
        <div class="TITLE_BAR">
            <img class="BANK_LOGO" [src]="bank_logo_src">
            <p class="TITLE">{{ account_name }}</p>
        </div>
    `,
    styles: `
        div.TITLE_BAR {
            display: flex;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 2.5vw;
            width: 100%;

            p.TITLE {
                font-weight: 600;
                font-size: 1.17rem;
            }

            img.BANK_LOGO {
                height: 2.9vh;
                object-fit: contain;
            }
        }
    `
})
export class AccountBarTitleBar {
    @Input({required: true}) bank_logo_src = ''
    @Input({required: true}) account_name = ''
}