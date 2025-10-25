import dotenv from "dotenv";

// Load .env only if not in production
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: "./.env" });
}
import app from "./app.js";
import connectToDatabase from "./database/index.js";
import { buildAdminRouter } from "./admin/admin.js";

const port = parseInt(process.env.PORT ?? "8080", 10); // fallback to 8001 only for local dev
const HOST = "0.0.0.0";

connectToDatabase()
  .then(() => {
    console.log("✅ Database connected");
    const { adminRouter, admin } = buildAdminRouter();
    app.use(admin.options.rootPath, adminRouter);

    const server = app.listen(port, HOST, () => {
      console.log(`Server running on http://${HOST}:${port}`);
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error("Failed to connect the database", error);
  });
