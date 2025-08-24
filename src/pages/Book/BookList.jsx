import BookItem from "./BookItem";

function BookList({ books }) {
    return (
        <ul className="list-group my-4">
            {books.map((book) => (
                <BookItem key={book.id} book={book} />
            ))}
        </ul>
    );
}

export default BookList;