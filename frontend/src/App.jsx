import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import HomePage from './pages/HomePage.jsx'
import CreateLoanPage from './pages/CreateLoanPage.jsx'
import EditLoanPage from './pages/EditLoanPage.jsx'
import RetrieveLoansPage from './pages/RetreiveLoansPage.jsx'
import RetrieveAuthorsPage from './pages/RetrieveAuthorsPage.jsx'
import RetrieveBooksPage from './pages/RetrieveBooksPage.jsx'
import RetrievePatronsPage from './pages/RetrievePatronsPage.jsx'
import './App.css'
import RetrieveLoanDetailsPage from './pages/RetrieveLoanDetailsPage.jsx'
import RetrieveBookAuthorsPage from './pages/RetreiveBookAuthorsPage.jsx'

export default function App() {
  const [loanToEdit, setLoanToEdit] = useState(null);

  return (
    
      <div className="page-shell">
        <header>
          <h1>Library Check-Out Management System</h1>
          <p>Track daily library operations. Manage loans, books, authors, and patrons.</p>
        </header>
        <Router>
        <nav>
          <Navigation />
        </nav>
        <main className = "site-main">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/loans" element={<RetrieveLoansPage setLoanToEdit={setLoanToEdit} />} />
            <Route path="/loans/create" element={<CreateLoanPage />} />
            <Route path="/loandetails" element={<RetrieveLoanDetailsPage setLoanToEdit={setLoanToEdit} />} />
            <Route path="/loandetails/edit/:_id" element={<EditLoanPage loanToEdit={loanToEdit} />} />

            <Route path="/patrons" element={<RetrievePatronsPage />} />
            <Route path="/bookauthors" element={<RetrieveBookAuthorsPage />} />
            <Route path="/authors" element={<RetrieveAuthorsPage />} />
            <Route path="/books" element={<RetrieveBooksPage />} />
          </Routes>
        </main>
        </Router>
        <footer>
          <p>&copy; 2026 Laura Riley & Jake Pruett</p>
        </footer>
      </div>
  )
}
