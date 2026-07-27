import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import HomePage from './pages/HomePage.jsx'
import CreateBookPage from './pages/CreateBookPage.jsx'
import CreateLoanPage from './pages/CreateLoanPage.jsx'
import EditBookPage from './pages/EditBookPage.jsx'
import EditLoanPage from './pages/EditLoanPage.jsx'
import RetrieveLoansPage from './pages/RetreiveLoansPage.jsx'
import RetrieveAuthorsPage from './pages/RetrieveAuthorsPage.jsx'
import RetrieveBooksPage from './pages/RetrieveBooksPage.jsx'
import RetrievePatronsPage from './pages/RetrievePatronsPage.jsx'
import './App.css'
import RetrieveLoanDetailsPage from './pages/RetrieveLoanDetailsPage.jsx'
import RetrieveBookAuthorsPage from './pages/RetreiveBookAuthorsPage.jsx'

const backendPort = import.meta.env.BACKEND_PORT;  // Use the port you assigned to the backend server, this would normally go in .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}/`;

export default function App() {
  const [authorToEdit, setAuthorToEdit] = useState(null);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [loanToEdit, setLoanToEdit] = useState(null);
  const [patronToEdit, setPatronToEdit] = useState(null);

  return (
    
      <div className="page-shell">
        <header>
          <h1>Library Check-Out Management System</h1>
          <p>Track daily library operations, managing loans, books, authors, and patrons.</p>
        </header>
        <Router>
        <nav>
          <Navigation />
        </nav>
        <main className = "site-main">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/authors" element={<RetrieveAuthorsPage setAuthorToEdit={setAuthorToEdit}/>} />

            <Route path="/books" element={<RetrieveBooksPage setBookToEdit={setBookToEdit} />} />
            <Route path="/books/create" element={<CreateBookPage />} />
            <Route path="/books/edit/:_id" element={<EditBookPage bookToEdit={bookToEdit} />} />

            <Route path="/loans" element={<RetrieveLoansPage setLoanToEdit={setLoanToEdit} />} />
            <Route path="/loans/create" element={<CreateLoanPage />} />
            <Route path="/loans/edit/:_id" element={<EditLoanPage loanToEdit={loanToEdit} />} />

            <Route path="/patrons" element={<RetrievePatronsPage setPatronToEdit={setPatronToEdit} />} />
            <Route path="/loandetails" element={<RetrieveLoanDetailsPage />} />
            <Route path="/bookauthors" element={<RetrieveBookAuthorsPage />} />
          </Routes>
        </main>
        </Router>
        <footer>
          <p>&copy; 2026 Laura Riley & Jake Pruett</p>
        </footer>
      </div>
  )
}
