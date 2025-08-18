
import React, { useState } from 'react';
import axios from 'axios';
import './BookDetailPopup.css'; // For styling the popup

const BookDetailPopup = ({ book, onClose, onBookIssued }) => {
    const [selectedUserId, setSelectedUserId] = useState('');
    const [isIssuing, setIsIssuing] = useState(false);
    const [issueMessage, setIssueMessage] = useState('');
    
    // Return book states
    const [returnUserId, setReturnUserId] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [isReturning, setIsReturning] = useState(false);
    const [returnMessage, setReturnMessage] = useState('');

    // 5 dummy users hardcoded
    const dummyUsers = [
        { id: 1, name: 'John Doe', email: 'john.doe@email.com' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com' },
        { id: 3, name: 'Mike Johnson', email: 'mike.johnson@email.com' },
        { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@email.com' },
        { id: 5, name: 'David Brown', email: 'david.brown@email.com' }
    ];

    const handleIssueBook = async () => {
        if (!selectedUserId) {
            setIssueMessage('Please select a user');
            return;
        }

        setIsIssuing(true);
        setIssueMessage('');
        console.log(book);

        try {
            const response = await axios.post('http://localhost:5000/api/issue', {
                book_id: book.book_id,
                // book_id: 21,
                user_id: parseInt(selectedUserId)
            });

            if (response.data.success) {
                setIssueMessage('Book issued successfully!');
                
                // Refresh the book data
                if (onBookIssued) {
                    await onBookIssued(book.book_id);
                }
                
                // No automatic popup closure - user must click close button
            } else {
                setIssueMessage(response.data.message || 'Failed to issue book');
            }
        } catch (error) {
            console.error('Error issuing book:', error);
            setIssueMessage('Error issuing book. Please try again.');
        } finally {
            setIsIssuing(false);
        }
    };

    const handleReturnBook = async () => {
        if (!returnUserId) {
            setReturnMessage('Please select a user');
            return;
        }

        if (!returnDate) {
            setReturnMessage('Please select a return date');
            return;
        }

        setIsReturning(true);
        setReturnMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/return', {
                book_id: book.book_id,
                user_id: parseInt(returnUserId),
                return_date: returnDate
            });

            if (response.data.success) {
                setReturnMessage('Book returned successfully!');
                
                // Refresh the book data
                if (onBookIssued) {
                    await onBookIssued(book.book_id);
                }
                
                // Clear form
                setReturnUserId('');
                setReturnDate('');
            } else {
                setReturnMessage(response.data.message || 'Failed to return book');
            }
        } catch (error) {
            console.error('Error returning book:', error);
            setReturnMessage('Error returning book. Please try again.');
        } finally {
            setIsReturning(false);
        }
    };

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

                {/* Issue Book Section */}
                <div className="issue-section">
                    <h3>Issue Book</h3>
                    <select 
                        value={selectedUserId} 
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        disabled={isIssuing}
                    >
                        <option value="">Select a user</option>
                        {dummyUsers.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>
                    
                    <button 
                        className="issue-btn" 
                        onClick={handleIssueBook}
                        disabled={isIssuing || !selectedUserId}
                    >
                        {isIssuing ? 'Issuing...' : 'Issue Book'}
                    </button>
                    
                    {issueMessage && (
                        <p className={`issue-message ${issueMessage.includes('successfully') ? 'success' : 'error'}`}>
                            {issueMessage}
                        </p>
                    )}
                </div>

                {/* Return Book Section */}
                <div className="return-section">
                    <h3>Return Book</h3>
                    <select 
                        value={returnUserId} 
                        onChange={(e) => setReturnUserId(e.target.value)}
                        disabled={isReturning}
                    >
                        <option value="">Select a user</option>
                        {dummyUsers.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>
                    
                    <input 
                        type="datetime-local" 
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        disabled={isReturning}
                        className="return-date-input"
                    />
                    
                    <button 
                        className="return-btn" 
                        onClick={handleReturnBook}
                        disabled={isReturning || !returnUserId || !returnDate}
                    >
                        {isReturning ? 'Returning...' : 'Return Book'}
                    </button>
                    
                    {returnMessage && (
                        <p className={`return-message ${returnMessage.includes('successfully') ? 'success' : 'error'}`}>
                            {returnMessage}
                        </p>
                    )}
                </div>

                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default BookDetailPopup;
