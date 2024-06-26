import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { booksTable } from "../drizzle/schema";
export const getAllBooksService = async () => {
    return await db.query.booksTable.findMany();
};
export const createBookService = async (book) => {
    return await db.insert(booksTable).values(book);
};
export const updateBookService = async (id, user) => {
    await db.update(booksTable).set(user).where(eq(booksTable.id, id));
    return "Book updated successfully";
};
export const getBookByIdService = async (id) => {
    return await db.query.booksTable.findFirst({
        where: eq(booksTable.id, id),
    });
};
export const deleteBookService = async (id) => {
    await db.delete(booksTable).where(eq(booksTable.id, id));
    return "Books deleted successfully";
};
