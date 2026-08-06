/*Citation for the following file
Date: 7/29/2026
Adapted from CS340 Web Application Technology Exploration
URL: https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351
*/

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4578';

export default function CreateLoanPage() {
  const navigate = useNavigate();
  const [patrons, setPatrons] = useState([]);
  const [selectedPatronId, setSelectedPatronId] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBookIds, setSelectedBookIds] = useState([]);
  const [checkoutDate, setCheckoutDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadPatrons = async () => {
      try {
        const response = await fetch(`${backendURL}/patrons`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setPatrons(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading patrons:', error);
        setMessage('Could not load patrons from the server.');
      }
    };

    loadPatrons();
  }, []);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch(`${backendURL}/books`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading books:', error);
        setMessage('Could not load books from the server.');
      }
    };

    loadBooks();
  }, []);

  const handleSelectBook = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedBookIds(selectedOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedPatronId) {
      setMessage('Please select a patron.');
      return;
    }

    if (selectedBookIds.length === 0) {
      setMessage('Please select at least one book.');
      return;
    }

    if (!checkoutDate || !dueDate) {
      setMessage('Please enter both a checkout date and a due date.');
      return;
    }

    const selectedPatron = patrons.find((patron) => patron.id_patron === selectedPatronId);
    setMessage(`Loan request created for ${selectedPatron?.fname} ${selectedPatron?.lname} with ${selectedBookIds.length} selected book(s).`);

    try {
      const response = await fetch(`${backendURL}/loans/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_patron: selectedPatronId,
          checkout_date: checkoutDate,
          books: selectedBookIds.map((id_book) => ({ id_book, due_date: dueDate }))
        })
      });

      if (!response.ok) {
        setMessage('Failed to create loan.');
        return;
      }

      navigate('/loans');
    } catch (error) {
      console.error('Error creating loan:', error);
      setMessage('An error occurred while creating the loan.');
    }
  };

  return (
    <section className="card">
      <h2>Add a new Loan</h2>
      <p>Select the borrower and choose one or more books to check out.</p>

      <form className="cuForm" onSubmit={handleSubmit}>
        <label htmlFor="create_loan_patron">Patron:</label>
        <Select
            inputId="create_loan_patron"
            name="patron"
            options={patrons.map((patron) => ({
              value: patron.id_patron,
              label: `${patron.fname} ${patron.lname}`
            }))}
            value={patrons
              .filter((patron) => patron.id_patron === selectedPatronId)
              .map((patron) => ({ value: patron.id_patron, label: `${patron.fname} ${patron.lname}` }))[0] ?? null}
            onChange={(selectedOption) => setSelectedPatronId(selectedOption?.value ?? '')}
        />

        <label htmlFor="create_loan_checkout_date">Checkout Date:</label>
        <input
          type="date"
          id="create_loan_checkout_date"
          value={checkoutDate}
          onChange={(event) => setCheckoutDate(event.target.value)}
          required
        />

        <label htmlFor="create_loan_due_date">Due Date:</label>
        <input
          type="date"
          id="create_loan_due_date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          required
        />


        {/*Citation for the following Select form
        Date: 7/29/2026
        Adapted from React-Select's website & StackOverflow
        URLS: https://react-select.com/home
              https://stackoverflow.com/questions/68563765/how-to-display-data-from-the-database-in-select-option*/}
        <label htmlFor="create_loan_books">Select Books:</label>
        <Select 
            isMulti
            name="books"
            options={books.map((book) => ({
              value: book.id_book,
              label: book.title
            }))}
            value={books.filter((book) => selectedBookIds.includes(book.id_book)).map((book) => ({
              value: book.id_book,
              label: book.title
            }))}
            onChange={(selectedOptions) => setSelectedBookIds(selectedOptions.map((option) => option.value))}
        />
            
        <button type="submit" style={{ marginTop: '20px', display: 'block' }}>
          Submit
        </button>
      </form>

      {message && <p style={{ marginTop: '16px' }}>{message}</p>}
    </section>
  );
}
