import { Request, Response } from "express";
import { validateCardNumber } from "../services/cardService";
export function validatedCard (req: Request, res: Response) {
    const {cardNumber} = req.body;
    if(!cardNumber || typeof cardNumber !== "string"){
        return res.status(400)
        .json({
            success: false,
            message: "cardNumber is required and must be a string",
        });
        return;
    }
    const isValid = validateCardNumber(cardNumber);
    res.status(200).json({
        success: true,
        cardNumber: cardNumber.replace(/\s|-/g, ""),
        isValid,
        message: isValid ? "Card number is valid" : "Card number is invalid",
    });
}