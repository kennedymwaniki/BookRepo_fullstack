import React, { useState, useCallback } from "react";

interface BookState {
  id: number;
  title: string;
  author: string;
  year: number;
}

interface BookItemProps {
  book: BookState;
  onUpdate: (updatedBook: BookState) => void;
  onDelete: (id: number) => void;
}

const BookItem2: React.FC<BookItemProps> = ({ book, onUpdate, onDelete }) => {
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
    const response = await fetch(`http://localhost:3000/api/books/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });
    const data = await response.json();
    onUpdate(data);
    setIsEditing(false);
  }, [book, title, author, year, onUpdate]);

  const handleDelete = useCallback(async () => {
    await fetch(`http://localhost:3000/api/books/${book.id}`, {
      method: "DELETE",
    });
    onDelete(book.id);
  }, [book.id, onDelete]);

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
