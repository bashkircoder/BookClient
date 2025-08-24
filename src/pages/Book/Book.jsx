import { useContext } from "react";
import BookForm from "./Bookform";
import BookManager from "./BookManager";
import { AuthContext } from "../../context/AuthContext";

function Book() {
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            {currentUser.role === "admin" && <BookForm />}
            <BookManager />
        </>
    );
}

export default Book;