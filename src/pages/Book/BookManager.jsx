import { useState, useContext, useEffect } from "react";
import { BookContext } from "../../context/BookContext";
import { AuthContext } from "../../context/AuthContext";
import BookList from "./BookList";

function BookManager() {
    const { currentUser } = useContext(AuthContext);
    const { books } = useContext(BookContext);
    //новые книги
    const newBooks = books.filter((b) => b.status === "new");

    //книги в работе
    //для админа отображаются все книги
    //для юзера только его книги
    const inProgressBooks =
        currentUser.role === "admin"
            ? books.filter((b) => b.status === "in-progress")
            : books.filter(
                  (b) =>
                      b.status === "in-progress" && b.userid === currentUser.id
              );

    //прочтенные книги
    const completedBooks =
        currentUser.role === "admin"
            ? books.filter((b) => b.status === "done")
            : books.filter(
                  (b) => b.status === "done" && b.userid === currentUser.id
              );

    return (
        <>
            <div className="accordion my-4" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button text-white bg-info"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseOne"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseOne"
                        >
                            Новые Книги
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseOne"
                        className="accordion-collapse collapse show"
                    >
                        <div className="accordion-body">
                            <BookList books={newBooks} />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed text-bg-success"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseTwo"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseTwo"
                        >
                            На прочтении
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse show"
                    >
                        <div className="accordion-body">
                            <BookList tavsks={inProgressBooks} />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed text-bg-danger"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseThree"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseThree"
                        >
                            Прочтенные
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseThree"
                        className="accordion-collapse collapse show"
                    >
                        <div className="accordion-body">
                            <BookList books={completedBooks} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookManager;