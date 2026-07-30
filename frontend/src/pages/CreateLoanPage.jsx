/*Citation for the following file
Date: 7/29/2026
Adapted from CS340 Web Application Technology Exploration
URL: https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351
*/

import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function CreateLoanPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBookIds, setSelectedBookIds] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4578'}/books`);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setMessage('Please enter both a first and last name.');
      return;
    }

    if (selectedBookIds.length === 0) {
      setMessage('Please select at least one book.');
      return;
    }

    setMessage(`Loan request created for ${firstName.trim()} ${lastName.trim()} with ${selectedBookIds.length} selected book(s).`);
  };

  return (
    <section className="card">
      <h2>Add a new Loan</h2>
      <p>Enter the borrower’s name and choose one or more books to check out.</p>

      <form className="cuForm" onSubmit={handleSubmit}>
        <label htmlFor="create_loan_fname">First Name:</label>
        <input
          type="text"
          id="create_loan_fname"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />

        <label htmlFor="create_loan_lname">Last Name:</label>
        <input
          type="text"
          id="create_person_lname"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
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
