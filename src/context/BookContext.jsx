import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

//создание глобального контекста приложения
export const BookContext = createContext();

function BookProvider({ children }) {
    //массив книг, по умолчанию пустой массив
    const [books, setBooks] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const token = localStorage.getItem("token");

    //загрузка книг после аутентификации пользователя
    useEffect(() => {
        if (currentUser) {
            getBooks();
        }
    }, [currentUser]);

    //получение всех книг
    const getBooks = async () => {
        const response = await fetch("http://localhost:8888/books", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            setBooks(data);
        }
    };

    //добавление новой книги
    const addBook = async (title, author, deadline) => {
        const response = await fetch("http://localhost:8888/books", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ title, author, deadline }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            getBooks();
        }
    };

    //изменение статуса книги и закрепление пользователя(пользователь берет задачу в работу)
    const toggleBook = async (id) => {
        const response = await fetch(
            `http://localhost:8888/books/active/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            getBooks();
        }
    };

    //прочтение книги
    const completeBook = async(id) => {
        const response = await fetch(
            `http://localhost:8888/books/complete/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            getBooks();
        }
    };

    //удаление книги по id
    const deleteBook = async(id) => {
        const response = await fetch(
            `http://localhost:8888/books/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            getBooks();
        }
    };

    return (
        <BookContext.Provider
            value={{
                books,
                getBooks,
                addBook,
                toggleBook,
                completeBook,
                deleteBook,
            }}
        >
            {children}
        </BookContext.Provider>
    );
}

export default BookProvider;