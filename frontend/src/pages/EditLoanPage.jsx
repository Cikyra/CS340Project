/*Citation for the use of AI tools: Laura Riley
  Date: 8/4/26
  Adapted from response from Gemini AI
  Source URL: gemini.google.com
  Prompt: Here is the database I am working with, 
  and set queries I am using to operate on it. 
  I am developing a web interface to interact with this 
  database and perform the operations listed in the file, 
  using React. Write me a file called EditLoanPage.jsx that 
  will handle user input to alter all the loan details of a specific loan

  For all places on this page where the Loan Detail ID input form is, it is 
  listed as (Dropdown), but they are not drop downs, they are incremental counters. 
  Change these to be a true drop down list
*/


import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const backendURL = import.meta.env.VITE_BACKEND_URL

const EditLoanPage = ({ loanToEdit }) => {
  const { _id } = useParams();
  const navigate = useNavigate();

  // State variables for form inputs
  const [idLoanDetailsUpdate, setIdLoanDetailsUpdate] = useState(_id ?? '');
  const [dueDate, setDueDate] = useState(loanToEdit?.due_date?.split('T')[0] ?? '');
  const [dateReturned, setDateReturned] = useState(loanToEdit?.date_returned?.split('T')[0] ?? '');
  const [idBookUpdate, setIdBookUpdate] = useState(loanToEdit?.id_book ?? '');
  

  const [idLoanDetailsDelete, setIdLoanDetailsDelete] = useState('');
  const [idLoanDelete, setIdLoanDelete] = useState('');

  // Options for the dropdown lists
  const [loanDetails, setLoanDetails] = useState([]);
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadDropdownOptions = async () => {
      try {
        const [loanDetailsResponse, loansResponse, booksResponse] = await Promise.all([
          fetch(`${backendURL}/loandetails`),
          fetch(`${backendURL}/loans`),
          fetch(`${backendURL}/books`)
        ]);
        const loanDetailsData = loanDetailsResponse.ok ? await loanDetailsResponse.json() : [];
        setLoanDetails(loanDetailsData);
        setLoans(loansResponse.ok ? await loansResponse.json() : []);
        setBooks(booksResponse.ok ? await booksResponse.json() : []);

        // loanToEdit prop is lost on direct navigation/refresh, so fall back to the fetched record for this _id
        const currentLoanDetail = loanDetailsData.find(
          (loanDetail) => String(loanDetail.id_loan_details) === String(_id)
        );
        if (currentLoanDetail) {
          setIdLoanDetailsUpdate(String(currentLoanDetail.id_loan_details));
          setIdBookUpdate(String(currentLoanDetail.id_book));
          setDueDate(currentLoanDetail.due_date?.split('T')[0] ?? '');
          setDateReturned(currentLoanDetail.date_returned?.split('T')[0] ?? '');
        }
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
    };

    loadDropdownOptions();
  }, [_id]);

  // ---------------------------------------------------------------------------
  // UPDATE QUERIES
  // ---------------------------------------------------------------------------
  // The only relevant fields for updating a loan are located in loan_details
  const handleUpdateLoanDetail = async (e) => {
    e.preventDefault();
    try {
      // Represents: UPDATE Loan_Details SET id_book = :id_book_Input, due_date = :due_date_Input, date_returned = :date_returned_Input WHERE id_loan_details = :id_loan_details_from_dropdown;
      const response = await fetch(`${backendURL}/loandetails/${idLoanDetailsUpdate}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_book: Number(idBookUpdate),
          due_date: dueDate,
          date_returned: dateReturned || null
        })
      });
      if (response.ok) {
        alert('Loan details updated successfully!');
        navigate('/loandetails');
      } else {
        alert('Failed to update loan details.');
      }
    } catch (error) {
      console.error('Error updating loan details:', error);
    }
  };

  // ---------------------------------------------------------------------------
  // DELETE QUERIES
  // ---------------------------------------------------------------------------
  // Delete an individual book from a loan event (via loan_details)[cite: 2]
  // Use case: library staff attached the wrong book to a loan[cite: 2]
  const handleDeleteLoanDetail = async (e) => {
    e.preventDefault();
    try {
      // Represents: DELETE FROM Loan_Details WHERE id_loan_details = :id_loan_details_from_dropdown;[cite: 2]
      const response = await fetch(`${backendURL}/loandetails/${idLoanDetailsDelete}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Book removed from loan successfully!');
        navigate('/loandetails');
      } else {
        alert('Failed to delete book from loan.');
      }
    } catch (error) {
      console.error('Error deleting loan detail:', error);
    }
  };

  // Delete a loan[cite: 2]
  // Use case: created by mistake, or patron changed their mind before leaving[cite: 2]
  const handleDeleteLoan = async (e) => {
    e.preventDefault();
    try {
      // Represents: DELETE FROM Loans WHERE id_loan = :id_loan_from_dropdown;[cite: 2]
      const response = await fetch(`${backendURL}/loans/${idLoanDelete}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Loan deleted successfully!');
        navigate('/loandetails');
      } else {
        alert('Failed to delete loan.');
      }
    } catch (error) {
      console.error('Error deleting loan:', error);
    }
  };

  return (
    <div className="edit-loan-page">
      <h1>Edit or Delete Loans</h1>
      <p>Modify existing loan records or remove them from the database.</p>
      
      <hr />

      {/* UPDATE LOAN DETAILS FORM */}
      <section>
        <h2>Update Loan Details</h2>
        <form onSubmit={handleUpdateLoanDetail}>
          <fieldset>
            <legend>Update Book, Due Date, & Return Date</legend>
            <label>
              Loan Detail ID (Dropdown):
              <select
                value={idLoanDetailsUpdate}
                onChange={(e) => setIdLoanDetailsUpdate(e.target.value)}
                required
              >
                <option value="" disabled>Select a loan detail...</option>
                {loanDetails.map((loanDetail) => (
                  <option key={loanDetail.id_loan_details} value={loanDetail.id_loan_details}>
                    {`ID ${loanDetail.id_loan_details} - ${loanDetail.book_title} (Loan #${loanDetail.id_loan})`}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Book (Dropdown):
              <select
                value={idBookUpdate}
                onChange={(e) => setIdBookUpdate(e.target.value)}
                required
              >
                <option value="" disabled>Select a book...</option>
                {books.map((book) => (
                  <option key={book.id_book} value={book.id_book}>
                    {book.title}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Due Date:
              <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
                required 
              />
            </label>
            <br />
            <label>
              Date Returned:
              <input 
                type="date" 
                value={dateReturned} 
                onChange={(e) => setDateReturned(e.target.value)} 
              />
            </label>
            <br />
            <button type="submit">Update Loan Detail</button>
          </fieldset>
        </form>
      </section>

      <hr />

      {/* DELETE LOAN DETAIL FORM */}
      <section>
        <h2>Remove Book From Loan</h2>
        <form onSubmit={handleDeleteLoanDetail}>
          <fieldset>
            <legend>Delete an individual book from a loan event</legend>
            <label>
              Loan Detail ID (Dropdown):
              <select
                value={idLoanDetailsDelete}
                onChange={(e) => setIdLoanDetailsDelete(e.target.value)}
                required
              >
                <option value="" disabled>Select a loan detail...</option>
                {loanDetails.map((loanDetail) => (
                  <option key={loanDetail.id_loan_details} value={loanDetail.id_loan_details}>
                    {`ID ${loanDetail.id_loan_details} - ${loanDetail.book_title} (Loan #${loanDetail.id_loan})`}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <button type="submit" style={{ color: 'red' }}>Delete Book from Loan</button>
          </fieldset>
        </form>
      </section>

      <hr />

      {/* DELETE LOAN FORM */}
      <section>
        <h2>Delete Entire Loan</h2>
        <form onSubmit={handleDeleteLoan}>
          <fieldset>
            <legend>Delete a loan event</legend>
            <label>
              Loan ID (Dropdown):
              <select
                value={idLoanDelete}
                onChange={(e) => setIdLoanDelete(e.target.value)}
                required
              >
                <option value="" disabled>Select a loan...</option>
                {loans.map((loan) => (
                  <option key={loan.id_loan} value={loan.id_loan}>
                    {`ID ${loan.id_loan} - ${loan.patron_lname}, ${loan.patron_fname}`}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <button type="submit" style={{ color: 'red' }}>Delete Entire Loan</button>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default EditLoanPage;