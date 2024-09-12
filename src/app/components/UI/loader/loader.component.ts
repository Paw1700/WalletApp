import { Component, Input } from "@angular/core";

@Component({
    selector: 'loader',
    standalone: true,
    template: `
        <div class="loader" [style.width.px]="size_in_px"></div>
    `,
    styles: `
        .loader {
            aspect-ratio: 1;
            border-radius: 50%;
            background:
                radial-gradient(farthest-side, var(--app-accent) 94%, #0000) top/8px 8px no-repeat,
                conic-gradient(#0000 30%, var(--app-accent));
            -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
            animation: l13 1s infinite linear;
        }

        @keyframes l13 {
            100% {
                transform: rotate(1turn)
            }
        }    
    `
})
export class Loader {
    @Input() size_in_px = 30
}