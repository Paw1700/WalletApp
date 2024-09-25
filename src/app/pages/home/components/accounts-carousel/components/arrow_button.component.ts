import { Component, Input } from "@angular/core";

@Component({
    selector: "arrow_button",
    standalone: true,
    template: `
        <div [class.CLICKED]="clicked" (click)="clickAnimation()" class="ARROW">
            @if (arrow_direction === 'left') {
                <img src="/assets/UI/arrow_left_v2/light.webp" />
            } @else {
                <img src="/assets/UI/arrow_right_v2/light.webp" />
            }
        </div>
    `,
    styles: `
        div.ARROW {
            width: 8.5vw;
            height: 8.5vw;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--app-accent);
            border-radius: 50%;
            transition: transform .1s ease-in-out;

            img {
                width: 55%;
                object-fit: contain;
            }

            &.CLICKED {
                transform: scale(.8);
            }
        }
    `
})
export class ArrowButton {
    @Input() arrow_direction: 'left' | 'right' = 'left'

    clicked = false

    clickAnimation() {
        this.clicked = true
        setTimeout(() => {
            this.clicked = false
        }, 100)
    }
}