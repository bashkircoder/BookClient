import { useContext, useEffect, useRef, useState } from "react";
import { BookContext } from "../../context/BookContext";

function BookForm() {
    //состояние будет привязано к полю ввода и будет меняться при изменении значения в поле ввода
    const [title, setTitle] = useState(""); //книга из поля ввода
    const [author, setAuthor] = useState("");
    const [deadline, setDeadline] = useState("");
    const inputRef = useRef(null);

    //обращаемся к контексту BookContext, достаем из него метод добавления книги
    const { addBook } = useContext(BookContext);

    useEffect(() => inputRef.current.focus(), []);

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook(title, author, deadline);
        setTitle(""); //очистка формы
        setAuthor("");
        setDeadline("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Введите задачу..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    ref={inputRef}
                />
                <input
                    type="text"
                    className="form-control ms-3"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                    type="date"
                    className="form-control ms-3"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <button className="btn btn-outline-success ms-3" type="submit">
                    Добавить
                </button>
            </div>
        </form>
    );
}

export default BookForm;