import { Component, Input } from "@angular/core";

@Component({
    selector: 'rectangle_button',
    standalone: true,
    template: `
        <div class="RECTANGLE_BUTTON">
            @switch (option) {
                @case('add_transaction') {
                    <img class="PLUS" src="/assets/UI/plus/light.webp" />
                    <p>Nowa transakcja</p>
                }
                @case ('add_account') {
                    <img class="PLUS" src="/assets/UI/plus/light.webp" />
                    <p>Nowe konto</p>
                }
                @case ('save') {
                    <img src="/assets/UI/save/light.webp" />
                    <p>Zapisz</p>
                }
            }
        </div>
    `,
    styles: `
        div.RECTANGLE_BUTTON {
            height: 12vw;
            padding-inline: 5vw;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 2.5vw;
            border-radius: 2.5vw;
            background-color: var(--app-accent);
            color: white;
            font-size: .8rem;
            font-weight: 700;

            img {
                height: 50%;
                object-fit: contain;

                &.PLUS {
                    height: 30%;
                }
            }
        }
    `
})
export class RectangleButton {
    @Input() option: 'save' | 'add_transaction' | 'add_account' = 'save'
}