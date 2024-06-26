import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { bookRouter } from "./books/booksRouter";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  cors({
    origin: "http://localhost:5173", // specify your frontend URL
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api", bookRouter);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
