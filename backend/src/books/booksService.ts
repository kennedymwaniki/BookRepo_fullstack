import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { booksTable, TIBooks, TSBooks } from "../drizzle/schema";

export const getAllBooksService = async () => {
  return await db.query.booksTable.findMany();
};

export const createBookService = async (book: TIBooks) => {
  return await db.insert(booksTable).values(book);
};

export const updateBookService = async (id: number, user: TIBooks) => {
  await db.update(booksTable).set(user).where(eq(booksTable.id, id));
  return "Book updated successfully";
};

export const getBookByIdService = async (
  id: number
): Promise<TSBooks | undefined> => {
  return await db.query.booksTable.findFirst({
    where: eq(booksTable.id, id),
  });
};

export const deleteBookService = async (id: number) => {
  await db.delete(booksTable).where(eq(booksTable.id, id));
  return "Books deleted successfully";
};
