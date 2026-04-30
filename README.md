# Card Validator API

A REST API that validates credit and debit card numbers using the Luhn algorithm, built with Node.js, TypeScript, and Express.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript (strict mode)
- **Framework:** Express.js
- **Testing:** Jest + Supertest

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

```bash
git clone https://github.com/Kwanza247/card-number-validator.git
cd card-number-validator
npm install
```

### Running the API

```bash
# Development (auto-restarts on file change)
npm run dev

# Production
npm run build
npm start
```

The server starts on `http://localhost:3000`

## API Reference

### POST ` /api/validate-card`

Validates whether a card number passes the Luhn algorithm check.

**Request Body**

```json
{
  "cardNumber": "4539148803436467"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| cardNumber | string | Yes | The card number to validate. Spaces and dashes are accepted. |

**Response — Valid Card**

```json
{
  "success": true,
  "cardNumber": "4539148803436467",
  "isValid": true,
  "message": "Card number is valid"
}
```

**Response — Invalid Card**

```json
{
  "success": true,
  "cardNumber": "1234567890123456",
  "isValid": false,
  "message": "Card number is invalid"
}
```

**Response — Bad Input**

```json
{
  "success": false,
  "message": "cardNumber is required and must be a string"
}
```

**HTTP Status Codes**

| Code | When |
|---|---|
| 200 | Request was understood and processed (card may still be invalid) |
| 400 | Missing or malformed input |

## Running Tests

```bash
npx jest
```

## Design Decisions

### Why the Luhn algorithm?
The Luhn algorithm is the industry standard for structural card number validation. It is used by Visa, Mastercard, Amex, and others to catch digit typos. It does not verify that a card account exists only that the number is structurally plausible. This distinction is intentional.

### Why Express over NestJS?
Express gives full visibility into every layer of the request lifecycle with no hidden abstractions. For a project of this scope, NestJS would add boilerplate without benefit and every line of this codebase can be explained without referring to framework magic.

### Why is HTTP 200 returned for invalid cards?
An invalid card number is a valid API response the server understood the request and returned a result. HTTP 400 signals a broken request, not a negative business outcome. Returning 200 with `isValid: false` is the correct REST semantics here.

### Why separate service, controller, and routes?
- **Service** — pure logic, no HTTP concerns, fully unit testable in isolation
- **Controller** — handles HTTP only, delegates logic to the service
- **Routes** — maps URLs to controllers, nothing else

This separation means each layer can change independently without breaking the others.

### Input sanitisation
Card numbers submitted with spaces (`4539 1488 0343 6467`) or dashes (`4539-1488-0343-6467`) are sanitised before validation. This is intentional — real-world card numbers are commonly formatted this way.

## Project Structure

```
src/
├── app.ts                  # Express app (middleware + routes)
├── server.ts               # Entry point
├── controllers/
│   └── card.controller.ts  # HTTP request/response handling
├── routes/
│   └── card.routes.ts      # Route definitions
└── services/
    └── card.service.ts     # Luhn algorithm logic
tests/
└── card.service.test.ts    # Unit tests for validation service
```