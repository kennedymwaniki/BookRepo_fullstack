import React, { useState, useCallback } from "react";
import { BookState, BookAction } from "../components/BookReducer";

interface BookItemProps {
  book: BookState;
  dispatch: React.Dispatch<BookAction>;
}

const BookItem2: React.FC<BookItemProps> = ({ book, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [year, setYear] = useState(book.year.toString());

  const handleUpdate = useCallback(async () => {
    const updatedBook: BookState = {
      ...book,
      title,
      author,
      year: parseInt(year),
    };
    const response = await fetch(
      `https://bookrepo-backend-g5i9.onrender.com/api/books/${book.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      }
    );
    const data = await response.json();
    dispatch({ type: "UPDATE", payload: data });
    setIsEditing(false);
  }, [book, title, author, year, dispatch]);

  const handleDelete = useCallback(async () => {
    await fetch(
      `https://bookrepo-backend-g5i9.onrender.com/api/books/${book.id}`,
      {
        method: "DELETE",
      }
    );
    dispatch({ type: "DELETE", payload: book.id });
  }, [book.id, dispatch]);

  return (
    <tr className="book-item">
      {isEditing ? (
        <>
          <td>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </td>
          <td>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </td>
          <td>
            <input value={year} onChange={(e) => setYear(e.target.value)} />
          </td>
          <td>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.year}</td>
          <td>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default BookItem2;
