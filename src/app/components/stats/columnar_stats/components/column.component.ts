import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "column",
    standalone: true,
    template: `
        <div [style.height.px]="active_height" class="COLUMN" [style.backgroundColor]="color ? color : 'var(--app-accent)'">&nbsp;</div>
    `,
    styles: `
        :host {
            display: flex;
            
            div {
                width: 100%;
                border-top-left-radius: 1.25vw;
                border-top-right-radius: 1.25vw;
                transition: height .3s ease-in-out;
            }
        }
    `
})
export class Column implements OnInit {
    @Input({required: true}) height_in_px = 0
    @Input() color: string | null = null

    active_height = 0

    ngOnInit(): void {
        setTimeout(() => {
            this.active_height = this.height_in_px
        }, 250)
    }
}