import React, { useState, useCallback } from "react";
import axios from "axios";
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
    try {
      const response = await axios.put(
        `https://bookrepo-backend-g5i9.onrender.com/api/books/${book.id}`,
        updatedBook,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "UPDATE", payload: response.data });
      console.log(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  }, [book, title, author, year, dispatch]);

  const handleDelete = useCallback(async () => {
    try {
      await axios.delete(
        `https://bookrepo-backend-g5i9.onrender.com/api/books/${book.id}`
      );
      dispatch({ type: "DELETE", payload: book.id });
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
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
            <button className="update" onClick={handleUpdate}>
              Update
            </button>
            <button className="cancel" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.year}</td>
          <td>
            <button className="edit" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete" onClick={handleDelete}>
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default BookItem2;
