import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log("Database_URL:", process.env.Database_URL!);

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABSE_URL!,
  },
  verbose: true,
  strict: true,
});

// import "dotenv/config";
// import { defineConfig } from "drizzle-kit";

// console.log("Database_URL:", process.env.Database_URL);

// export default defineConfig({
//   schema: "./src/drizzle/schema.ts",
//   out: "./src/drizzle/migrations",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: process.env.DATABSE_URL!,
//   },
//   verbose: true,
//   strict: true,
// });
