import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { booksRouter } from "./routes/bookRoutes";
import { closeDatabase, initDatabase } from "./database/database";
import { config } from "./config";
import morgan from "morgan";
import path from "path";

dotenv.config();

const app = express();
const PORT = config.server.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan(":date[iso] :method :url :status :response-time ms"));

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

app.use("/api/books", booksRouter);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

async function startServer() {
  try {
    await initDatabase();
    console.log("Database initialized successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down server...");
  try {
    await closeDatabase();
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
});

process.on("SIGTERM", async () => {
  console.log("\nShutting down server...");
  try {
    await closeDatabase();
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
});
