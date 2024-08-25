import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'number_separator',
    standalone: true
})
export class NumberSeparator implements PipeTransform {
    transform(v: number | string | null | undefined) {
        if (typeof v === 'string') {
            v = Number(v)
        }
        if (v === null || v === undefined) {
            v = 0
        }
        let value = v.toFixed(2)
        let value_length_without_cents = value.length - 3
        let how_many_full_3Digit = Math.floor(value_length_without_cents / 3)
        let end_index_of_first_3Digit = value_length_without_cents - how_many_full_3Digit * 3
        let number: string = ''

        for (let i = 0; i <= how_many_full_3Digit; i++) {
            let append = ''
            if (i === 0) {
                append = value.substring(i, end_index_of_first_3Digit)
            } else if (i > 0) {
                append = value.substring(end_index_of_first_3Digit + (3 * (i - 1)), end_index_of_first_3Digit + (3 * i))
            }
            number = number.concat(append, i < how_many_full_3Digit ? " " : "")
        }

        number = number.concat(",", value.toString().substring(value_length_without_cents + 1))

        return number
    }
}