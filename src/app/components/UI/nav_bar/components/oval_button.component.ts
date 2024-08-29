import { Component, Input } from "@angular/core";

@Component({
    selector: 'oval_button',
    standalone: true,
    template: `
        <div class="OVAL_BUTTON">
            @if (icon === 'arrow_left' || icon === 'arrow_right') {
                <img [src]="'/assets/UI/' + icon + '/light.webp'" />
            } @else {
                <img src="/assets/UI/menu/light.webp">
            }
        </div>
    `,
    styles: `
        div.OVAL_BUTTON {
            width: 12.7vw;
            height: 12.7vw;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: var(--app-accent);
            
            img {
                width: 60%;
                object-fit: contain;
            }
        }
    `
})
export class OvalButton {
    @Input() icon: 'arrow_left' | 'arrow_right' | 'menu' = 'arrow_left'
}