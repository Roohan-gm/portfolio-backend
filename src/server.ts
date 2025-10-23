import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import app from "./app.ts";
import connectToDatabase from "./database/index.ts";
import { buildAdminRouter } from "./admin/admin.ts";

const port = parseInt(process.env.PORT ?? "8001", 10); // fallback to 8001 only for local dev
const HOST = "0.0.0.0";

connectToDatabase()
  .then(() => {
    const { adminRouter, admin } = buildAdminRouter();
    app.use(admin.options.rootPath, adminRouter);

    const server = app.listen(port, HOST, () => {
      console.log(`Server running on http://${HOST}:${port}`);
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
      throw error;
    });
  })
  .catch((error) => {
    console.error("Failed to connect the database", error);
  });
