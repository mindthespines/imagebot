import express from "express";
import cors from "cors";

import { handleNotFound, handleError } from "./lib/middleware/error-handlers";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res, next) => {
  try {
    res.send("Hi!");
  } catch (error) {
    next(error);
  }
});

app.use(handleNotFound);
app.use(handleError);

export default app;
