import React, {
  useState,
  useReducer,
  useRef,
  useCallback,
  useEffect,
} from "react";
import BookItem from "./components/BookItem";
import { BookReducer, BookState } from "./components/BookReducer";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

const App: React.FC = () => {
  const [books, dispatch] = useReducer(BookReducer, []);
  const [filteredBooks, setFilteredBooks] = useState<BookState[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const [storedBooks, setStoredBooks] = useLocalStorage<BookState[]>(
    "books",
    []
  );
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (storedBooks.length) {
      dispatch({ type: "LOAD", payload: storedBooks });
    }
  }, [storedBooks]);

  useEffect(() => {
    setStoredBooks(books);
  }, [books, setStoredBooks]);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchTerm, books]);

  const addBook = () => {
    if (titleRef.current && authorRef.current && yearRef.current) {
      const newBook: BookState = {
        id: Date.now(),
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: parseInt(yearRef.current.value),
      };
      dispatch({ type: "ADD", payload: newBook });
      titleRef.current.value = "";
      authorRef.current.value = "";
      yearRef.current.value = "";
    }
  };

  const handlePagination = useCallback(
    (direction: "next" | "prev") => {
      if (
        direction === "next" &&
        currentPage * booksPerPage < filteredBooks.length
      ) {
        setCurrentPage(currentPage + 1);
      } else if (direction === "prev" && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    },
    [currentPage, filteredBooks.length]
  );

  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  return (
    <div className="App">
      <h1>Book Repository Application</h1>
      <div className="form-container">
        <input ref={titleRef} placeholder="Title" />
        <input ref={authorRef} placeholder="Author" />
        <input ref={yearRef} placeholder="Publication Year" />
        <button onClick={addBook}>Add Book</button>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title"
        className="search"
      />
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Events</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <BookItem key={book.id} book={book} dispatch={dispatch} />
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

export default App;
