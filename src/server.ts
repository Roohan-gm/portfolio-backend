import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import app from "./app.ts";
import connectToDatabase from "./database/index.ts";
import { buildAdminRouter } from "./admin/admin.ts";


const port = process.env.PORT || 8000;

connectToDatabase()
  .then(() => {
    const { adminRouter, admin } = buildAdminRouter();
    app.use(admin.options.rootPath, adminRouter);

    const server = app.listen(port, () => {
      console.log("Server is running on port: ", port);
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
      throw error;
    });
  })
  .catch((error) => {
    console.error("Failed to connect the database", error);
  });
