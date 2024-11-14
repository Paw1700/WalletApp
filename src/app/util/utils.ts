export const imageToBase64 = (image: File) => {
    return new Promise<string>((resolve) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.readAsDataURL(image);
    });
}

/**
 * Returns polish name of month given as a number (from 0 to 11).
 * @param {number} month_number - number of month (from 0 to 11)
 * @returns {string} polish name of month
 */
export const getMonthName = (month_number: number) => {
    const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]
    return months[month_number]
}

export function copyArray<T>(array: T[]): T[] {
    return JSON.parse(JSON.stringify(array))
}

export function removeElementFromArray<T>(array: T[], index: number): T[] {
    return array.slice(0, index).concat(array.slice(index + 1))
}