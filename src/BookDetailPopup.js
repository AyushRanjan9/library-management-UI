
import React from 'react';
import './BookDetailPopup.css'; // For styling the popup

const BookDetailPopup = ({ book, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>{book.title}</h2>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Publication Year:</strong> {book.publication_year}</p>
                <p><strong>Copies Available:</strong> {book.copies_available}</p>
                <p><strong>Author:</strong> {book.author_first_name} {book.author_last_name}</p>
                <p><strong>Publisher:</strong> {book.publisher_name}</p>
                <p><strong>Category:</strong> {book.category_name}</p>

                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default BookDetailPopup;
