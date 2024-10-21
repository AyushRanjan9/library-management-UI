
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BooksList.css'; // For styling the tiles
import BookDetailPopup from './BookDetailPopup';

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        // Fetch all books from API
        axios.get('http://localhost:3000/api/books')
            .then(response => {
                if (response.data.success) {
                    setBooks(response.data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    const handleTileClick = (bookId) => {
        // Fetch details of the clicked book
        axios.get(`http://localhost:3000/api/books/${bookId}`)
            .then(response => {
                if (response.data.success) {
                    setSelectedBook(response.data.data);
                    setIsPopupOpen(true); // Open the popup
                }
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedBook(null);
    };

    return (
        <div className="book-tiles-container">
            {books.map((book) => (
                <div key={book.book_id} className="book-tile" onClick={() => handleTileClick(book.book_id)}>
                    <h3>{book.title}</h3>
                    <p>Copies available: {book.copies_available}</p>
                </div>
            ))}
            
            {isPopupOpen && selectedBook && (
                <BookDetailPopup book={selectedBook} onClose={handleClosePopup} />
            )}
        </div>
    );
}
export default BooksList;
