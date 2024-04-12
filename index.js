import express, { json } from "express";
import cors from "cors";
import linkroute from "./routes/linkroute.js";
import userroute from "./routes/userroute.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(cors());
app.use(json());
app.use(cookieParser());
app.use("/api/link", linkroute);
app.use("/api/user", userroute);

app.listen(port, () => console.log(`app listening to the port ${port}`));
