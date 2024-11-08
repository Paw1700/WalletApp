import { animate, AnimationMetadata, group, query, style, transition } from "@angular/animations";

export const ScaleInAnimation: AnimationMetadata[] = [
    style({
        transform: 'scale(.8)',
        opacity: 0
    }),
    animate('300ms ease-in-out', style({
        transform: 'scale(1)',
        opacity: 1
    }))
]

export const ScaleOutAnimation: AnimationMetadata[] = [
    animate('300ms ease-in-out', style({
        transform: 'scale(.8)',
        opacity: 0
    }))
]

export const ScaleInOutAnimation: AnimationMetadata[] = [
    transition(':enter', ScaleInAnimation),
    transition(':leave', ScaleOutAnimation)
]

export const FadeInPageAnimation: AnimationMetadata[] = [
    group([
        query(":enter", [
            style({ zIndex: 1, opacity: 0 }),
            animate('350ms ease-out', style({
                opacity: 1
            }))
        ], { optional: true }),
        query(":leave", [
            style({ zIndex: 2, opacity: 1 }),
            animate('350ms ease-in', style({
                opacity: 0
            }))
        ], { optional: true })
    ])
]

export const SlideToLeftPageAnimation: AnimationMetadata[] = [
    group([
        query(":enter", [
            style({ position: 'absolute', left: '100vw', zIndex: 2 }),
            animate('350ms ease-in-out', style({
                left: 0
            }))
        ], { optional: true }),
        query(":leave", [
            style({ zIndex: 1, position: 'absolute', left: 0, opacity: 1 }),
            animate('350ms ease-in-out', style({
                left: '-100vw',
                opacity: 0
            }))
        ], { optional: true })
    ])
]

export const SlideToRightPageAnimation: AnimationMetadata[] = [
    group([
        query(":enter", [
            style({ zIndex: 1, position: 'absolute', left: '-100vw' }),
            animate('350ms ease-in-out', style({
                left: 0
            }))
        ], { optional: true }),
        query(":leave", [
            style({ zIndex: 2, position: 'absolute', left: 0, opacity: 1 }),
            animate('350ms ease-in-out', style({
                left: '100vw',
                opacity: 0
            }))
        ], { optional: true })
    ])
]