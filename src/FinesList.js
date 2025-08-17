import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FinesList.css';

const FinesList = () => {
    const [finesData, setFinesData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');

    // 5 dummy users hardcoded
    const dummyUsers = [
        { id: 1, name: 'John Doe', email: 'john.doe@email.com' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com' },
        { id: 3, name: 'Mike Johnson', email: 'mike.johnson@email.com' },
        { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@email.com' },
        { id: 5, name: 'David Brown', email: 'david.brown@email.com' }
    ];

    useEffect(() => {
        if (selectedUserId) {
            fetchFines(selectedUserId);
        } else {
            setFinesData(null);
        }
    }, [selectedUserId]);

    const fetchFines = async (userId) => {
        setIsLoading(true);
        setError('');
        
        try {
            const response = await axios.get(`http://localhost:5000/api/fines/${userId}`);
            console.log('Fines API response:', response.data);
            
            if (response.data.success) {
                setFinesData(response.data.data);
            } else {
                setError(response.data.message || 'Failed to fetch fines');
                setFinesData(null);
            }
        } catch (error) {
            console.error('Error fetching fines:', error);
            setError('Error fetching fines. Please try again.');
            setFinesData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserChange = (e) => {
        setSelectedUserId(e.target.value);
    };

    return (
        <div className="fines-container">
            <h2>Library Fines Management</h2>
            
            <div className="user-selector">
                <label htmlFor="userSelect">Select User:</label>
                <select 
                    id="userSelect"
                    value={selectedUserId} 
                    onChange={handleUserChange}
                >
                    <option value="">Choose a user</option>
                    {dummyUsers.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                        </option>
                    ))}
                </select>
            </div>

            {isLoading && (
                <div className="loading-message">
                    Loading fines...
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {!isLoading && !error && selectedUserId && finesData && (
                <div className="fines-content">
                    <div className="fines-summary">
                        <div className="total-fines-card">
                            <h3>Total Fines</h3>
                            <div className="fines-amount">
                                ${finesData.total_fines || '0.00'}
                            </div>
                            <p className="fines-description">
                                Total outstanding fines for this user
                            </p>
                        </div>
                    </div>
                    
                    {/* If there are individual fine records, display them in a table */}
                    {finesData.fines && finesData.fines.length > 0 ? (
                        <div className="fines-table">
                            <h3>Fine Details</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Fine ID</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Due Date</th>
                                        <th>Book Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finesData.fines.map((fine, index) => (
                                        <tr key={index}>
                                            <td>{fine.fine_id}</td>
                                            <td>${fine.amount}</td>
                                            <td>
                                                <span className={`status ${fine.status.toLowerCase()}`}>
                                                    {fine.status}
                                                </span>
                                            </td>
                                            <td>{fine.due_date}</td>
                                            <td>{fine.book_title || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="no-fines">
                            <p>No detailed fine records available.</p>
                        </div>
                    )}
                </div>
            )}

            {!selectedUserId && !isLoading && (
                <div className="select-user-message">
                    <p>Please select a user to view their fines.</p>
                </div>
            )}
        </div>
    );
};

export default FinesList;
