import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./src/lib/db.js";
import authRouter from "./src/routes/auth.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import notesRouter from "./src/routes/notes.router.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://notes-app-frontend-umber-five.vercel.app/",
  "http://localhost:5173", // for development
];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running: " + PORT);
  });
});
