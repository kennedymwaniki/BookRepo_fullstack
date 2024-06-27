import React, { useState, useReducer, useEffect, useCallback } from "react";
import axios from "axios";
import BookItem2 from "./BookItem2";
import "../App.css";
import { BookReducer, BookState } from "../components/BookReducer";
import Loader from "../components/Loader";

const App2: React.FC = () => {
  const [books, dispatch] = useReducer(BookReducer, []);
  const [filteredBooks, setFilteredBooks] = useState<BookState[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const booksPerPage = 5;

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://bookrepo-backend-g5i9.onrender.com/api/books"
      );
      dispatch({ type: "LOAD", payload: response.data });
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // useEffect(() => {
  //   console.log("Books updated:", books);
  // }, [books]);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchTerm, books]);

  const addBook = async () => {
    const newBook: Omit<BookState, "id"> = {
      title,
      author,
      year: parseInt(year),
    };
    try {
      const response = await axios.post(
        "https://bookrepo-backend-g5i9.onrender.com/api/books",
        newBook,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "ADD", payload: response.data });
      console.log(books);
      setTitle("");
      setAuthor("");
      setYear("");
      fetchBooks();
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  const handlePagination = (direction: "next" | "prev") => {
    if (
      direction === "next" &&
      currentPage * booksPerPage < filteredBooks.length
    ) {
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
      {loading ? (
        <Loader />
      ) : (
        <>
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
                <BookItem2 key={book.id} book={book} dispatch={dispatch} />
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => handlePagination("prev")}>Previous</button>
            <button onClick={() => handlePagination("next")}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App2;
