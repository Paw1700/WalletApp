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