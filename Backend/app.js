import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import swipeRouter from "./routes/swipeRouter.js";
import projectRouter from "./routes/projectRouter.js";
import interactionRouter from "./routes/interactionRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import ideaRoutes from "./routes/ideaRoutes.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/swipe", swipeRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/interaction", interactionRouter);
app.use('/api/ideas', ideaRoutes);

dbConnection();

app.use(errorMiddleware);

export default app;
