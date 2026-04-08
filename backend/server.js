import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import generateRoutes from "./routes/generate.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/generate", generateRoutes);

app.use("/download", express.static(path.join(process.cwd(), "temp")));

app.listen(port, () =>
  console.log(`Server running on ${port}`)
);