import { useNavigate } from "react-router-dom";

export const Book = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div className="book_image" onClick={() => navigate(`/books/${book.id}`)}>
      <img src={book.book.bookImage} alt={book.title} />
    </div>
  );
};
