import { Hono } from "hono";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "./booksController";

export const bookRouter = new Hono();

bookRouter.get("/books", getAllBooks);
bookRouter.get("/books/:id", getBook);
bookRouter.put("/books/:id", updateBook);
bookRouter.post("/books", createBook);
bookRouter.delete("/books/:id", deleteBook);
