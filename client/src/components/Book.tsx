import React from "react";
import { BookState, BookAction } from "./BookReducer";

interface BookProps {
  book: BookState;
  dispatch: React.Dispatch<BookAction>;
}

const Book: React.FC<BookProps> = ({ book, dispatch }) => {
  const handleDelete = () => {
    dispatch({ type: "DELETE", payload: book.id });
  };

  return (
    <div className="book">
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.year}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Book;
