import {
  createBookService,
  deleteBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
} from "./booksService";
import { Context } from "hono";

export const getAllBooks = async (c: Context) => {
  const data = await getAllBooksService();
  return c.json(data);
};

export const getBook = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  console.log(id);
  const book = await getBookByIdService(id);
  if (!book) {
    return c.json({ error: "Book not found" }, 404);
  }
  return c.json(book, 200);
};

export const createBook = async (c: Context) => {
  try {
    const book = await c.req.json();
    console.log(book);
    const createdBook = await createBookService(book);
    if (!createBook) {
      return c.text("Book not created");
    }
    return c.json({ msg: createdBook }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const deleteBook = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid Id", 400);

    //search for the book
    const book = await getBookByIdService(id);
    if (book == undefined) return c.text("Book not found", 404);
    //deleting the book
    const res = await deleteBookService(id);
    if (!res) return c.text("Book not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message });
  }
};

export const updateBook = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const book = await c.req.json();
    // search for the book
    const searchedBook = await getBookByIdService(id);
    if (searchedBook == undefined) return c.text("Book not found", 404);
    // get the data and update it
    const res = await updateBookService(id, book);
    // return a success message
    if (!res) return c.text("Book not updated", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
