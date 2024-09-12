import { animate, AnimationMetadata, style, transition } from "@angular/animations";

export const ScaleInAnimation: AnimationMetadata[] = [
    style({
        transform: 'scale(.8)',
        opacity: 0
    }),
    animate('350ms ease-out', style({
        transform: 'scale(1)',
        opacity: 1
    }))
]

export const ScaleOutAnimation: AnimationMetadata[] = [
    animate('350ms ease-in', style({
        transform: 'scale(.8)',
        opacity: 0
    }))
]

export const ScaleInOutAnimation: AnimationMetadata[] = [
    transition(':enter', ScaleInAnimation),
    transition(':leave', ScaleOutAnimation)
]