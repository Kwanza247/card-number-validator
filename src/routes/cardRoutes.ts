import { Router } from "express";
import { validatedCard } from "../controllers/cardController";

const router = Router();

router.post("/validate-card", validatedCard);
export default router;