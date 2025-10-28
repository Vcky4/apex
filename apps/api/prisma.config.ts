import { defineConfig, env } from "prisma/config";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env file from the current directory
config({ path: resolve(__dirname, ".env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
