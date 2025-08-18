
import React, { useState } from 'react';
import BooksList from './BooksList';
import FinesList from './FinesList';
import './App.css';

function App() {
    const [activeTab, setActiveTab] = useState('books');

    return (
        <div className="App">
            <header className="app-header">
                <h1>Library Management System</h1>
                <div className="tab-container">
                    <button 
                        className={`tab-button ${activeTab === 'books' ? 'active' : ''}`}
                        onClick={() => setActiveTab('books')}
                    >
                        📚 Books
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'fines' ? 'active' : ''}`}
                        onClick={() => setActiveTab('fines')}
                    >
                        💰 Fines
                    </button>
                </div>
            </header>
            
            <main className="app-content">
                {activeTab === 'books' && <BooksList />}
                {activeTab === 'fines' && <FinesList />}
            </main>
        </div>
    );
}

export default App;
