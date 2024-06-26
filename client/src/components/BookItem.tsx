import React, { useRef, useState, useCallback } from "react";
import { BookState, BookAction } from "./BookReducer";

interface BookItemProps {
  book: BookState;
  dispatch: React.Dispatch<BookAction>;
}

const BookItem: React.FC<BookItemProps> = ({ book, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleUpdate = useCallback(() => {
    if (titleRef.current && authorRef.current && yearRef.current) {
      const updatedBook: BookState = {
        ...book,
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: parseInt(yearRef.current.value),
      };
      dispatch({ type: "UPDATE", payload: updatedBook });
      setIsEditing(false);
    }
  }, [book, dispatch]);

  const handleDelete = useCallback(() => {
    dispatch({ type: "DELETE", payload: book.id });
  }, [book.id, dispatch]);

  return (
    <tr className="book-item">
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.year}</td>
      <td>
        {isEditing ? (
          <>
            <input ref={titleRef} defaultValue={book.title} />
            <input ref={authorRef} defaultValue={book.author} />
            <input ref={yearRef} defaultValue={book.year.toString()} />

            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default BookItem;
