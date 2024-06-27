import React, { useState, useEffect } from "react";
import BookItem3 from "./BookItem3";
import "../App.css";

interface BookState {
  id: number;
  title: string;
  author: string;
  year: number;
}

const App3: React.FC = () => {
  const [books, setBooks] = useState<BookState[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookState[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const booksPerPage = 5;

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:3000/api/books");
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchTerm, books]);

  const addBook = async () => {
    const newBook = {
      title,
      author,
      year: parseInt(year),
    };
    const response = await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    const data = await response.json();
    setBooks([...books, data]);
    setTitle("");
    setAuthor("");
    setYear("");
  };

  const updateBook = (updatedBook: BookState) => {
    setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handlePagination = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage * booksPerPage < filteredBooks.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  return (
    <div className="App">
      <h1>Book Repository</h1>
      <div className="form-container">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Publication Year"
        />
        <button onClick={addBook}>Add Book</button>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title"
      />
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <BookItem3 key={book.id} book={book} onUpdate={updateBook} onDelete={deleteBook} />
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePagination("prev")}>Previous</button>
        <button onClick={() => handlePagination("next")}>Next</button>
      </div>
    </div>
  );
};

export default App3;
