export const convertToMoneyFormat = (
    amount: number,
    delimiter: string = ","
) => {
    // Format the number with commas as thousand separators and two decimal places
    const formattedAmount = amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // Replace commas with the specified delimiter (if needed)
    return formattedAmount.replace(/,/g, delimiter);
};

export function convertMoneyStrToNumber(string: string): number {
    // Remove all non-numeric characters except the decimal point
    const numericString = string.replace(/[^0-9.]/g, '');

    // Parse the cleaned string into a number
    return parseFloat(numericString);
}
