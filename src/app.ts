import express, { Application } from "express";
import cardRoutes from "./routes/cardRoutes";

const app: Application = express();

app.use(express.json());
app.use("/api", cardRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Card Number Validator API");
});

export default app;