import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./src/routes";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ limit: "1000mb", extended: true }));
const PORT = process.env.PORT;
app.use("/v1/api", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Internal Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log("Server running at PORT: 3000 and accessible on the network");
});
