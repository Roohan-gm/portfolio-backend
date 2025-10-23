import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173"]; // fallback for development

interface CorsCallback {
  (err: Error | null, allow?: boolean): void;
}

interface CorsOptions {
  origin: (origin: string | undefined | null, callback: CorsCallback) => void;
  credentials: boolean;
  optionsSuccessStatus: number;
}

const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined | null,
    callback: CorsCallback
  ): void {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin as string) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(
  cors(
    // corsOptions
  )
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import routes from "./routes/index.ts";

app.get("/api/v1", (req, res) => {
  res.json({ message: "API is running!", version: "v1" });
});

app.use("/api/v1", routes);

export default app;
