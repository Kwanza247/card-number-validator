// card service test
import { validateCardNumber } from "../src/services/cardService";

// import { validateCardNumber } from "../src/services/card.service";

describe("validateCardNumber", () => {
  
  describe("valid card numbers", () => {
    it("should return true for a valid Visa card number", () => {
      expect(validateCardNumber("4539148803436467")).toBe(true);
    });

    it("should return true for a valid Mastercard number", () => {
      expect(validateCardNumber("5425233430109903")).toBe(true);
    });

    it("should return true for a valid Amex number", () => {
      expect(validateCardNumber("378282246310005")).toBe(true);
    });

    it("should return true when card number has spaces", () => {
      expect(validateCardNumber("4539 1488 0343 6467")).toBe(true);
    });

    it("should return true when card number has dashes", () => {
      expect(validateCardNumber("4539-1488-0343-6467")).toBe(true);
    });
  });

 
  describe("invalid card numbers", () => {
    it("should return false for a number that fails the Luhn check", () => {
      expect(validateCardNumber("1234567890123456")).toBe(false);
    });

    it("should return false for a number that is too short", () => {
      expect(validateCardNumber("123456789012")).toBe(false);
    });

    it("should return false for a number that is too long", () => {
      expect(validateCardNumber("12345678901234567890")).toBe(false);
    });
  });

  describe("bad input", () => {
    it("should return false for letters", () => {
      expect(validateCardNumber("abcd1234efgh5678")).toBe(false);
    });

    it("should return false for an empty string", () => {
      expect(validateCardNumber("")).toBe(false);
    });

    it("should return false for special characters", () => {
      expect(validateCardNumber("4539!488@0343#467")).toBe(false);
    });
  });
});