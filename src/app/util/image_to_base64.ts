export const imageToBase64 = (image: File) => {
    return new Promise<string>((resolve) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.readAsDataURL(image);
    });
}