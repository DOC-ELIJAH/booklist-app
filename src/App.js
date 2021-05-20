import React, { useState } from "react";
import Message from "./Message";
import { FaEdit, FaTrash } from "react-icons/fa";

// const getLocalStorage = () => {
//   let list = localStorage.getItem("books");

//   if (list) {
//     return JSON.parse(localStorage.getItem("list"));
//   } else {
//     return [];
//   }
// };

const App = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const [books, setBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setBook({ ...book, [name]: value });
    console.log(value, name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.genre) {
      //display alert
      showAlert(true, "danger", "please enter value");
    } else if (book && isEditing) {
      const updatedBook = books.map((item) =>
        item.id === editID ? book : item
      );

      console.log(updatedBook);
      setBooks(updatedBook);

      setBook({ title: "", author: "", genre: "", comments: "" });
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      //show alert
      showAlert(true, "success", "book added successfully");
      const newBook = { ...book, id: new Date().getMilliseconds().toString() };
      setBooks([...books, newBook]);
      setBook({ title: "", author: "", genre: "", comments: "" });
      console.log(books);
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list. no books found");
    setBooks([]);
  };

  const removeBook = (id) => {
    showAlert(true, "danger", "book removed");
    setBooks(books.filter((book) => book.id !== id));
  };

  const editBook = (id) => {
    console.log(id);
    const specificBook = books.find((item) => item.id === id);
    console.log(specificBook);
    setIsEditing(true);
    setEditID(id);
    setBook(specificBook);
  };

  // useEffect(() => {
  //   localStorage.setItem("books", JSON.stringify(books));
  // }, [books]);

  return (
    <>
      <main>
        {alert.show && (
          <Message {...alert} removeAlert={showAlert} books={books} />
        )}
        <h2>booking list</h2>
        <form className="form">
          <div className="inputWrapper">
            <input
              type="text"
              name="title"
              id="title"
              value={book.title}
              onChange={handleChange}
              placeholder=" book title"
            />
          </div>
          <div className="inputWrapper">
            <input
              type="text"
              name="author"
              id="author"
              value={book.author}
              onChange={handleChange}
              placeholder="book author"
            />
          </div>
          <div className="inputWrapper">
            <input
              type="text"
              name="genre"
              id="genre"
              value={book.genre}
              onChange={handleChange}
              placeholder="book genre"
            />
          </div>

          <div className="btnWrapper">
            <button type="submit" onClick={handleSubmit}>
              {isEditing ? "edit" : "Add Book"}
            </button>

            <button className="clear-btn" onClick={clearList}>
              clear list
            </button>
          </div>
        </form>
        {books.map((book) => {
          const { id, title, author, genre } = book;
          return (
            <section className="addedItem" key={id}>
              <h4>{title}</h4>
              <p>{author}</p>
              <p>{genre}</p>
              <div className="btn-container">
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => editBook(id)}
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => removeBook(id)}
                >
                  <FaTrash />
                </button>
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
};

export default App;
