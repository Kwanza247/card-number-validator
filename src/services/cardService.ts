function validateCardNumber(cardNumber: string): boolean {
    
    const strippedCardNumber = cardNumber.replace(/[\s-]/g, "");
    
    if(!/^\d+$/.test(strippedCardNumber)) return false;

    if (strippedCardNumber.length < 13 || strippedCardNumber.length > 19) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i=strippedCardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(strippedCardNumber[i], 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -=9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}