import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import routes from "./routes";
import { errorHandler } from "./utils";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5050;

app.use(routes);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running on port: ${PORT}`);
});
