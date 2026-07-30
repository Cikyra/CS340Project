import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoanDetailsTable from '../components/LoanDetailsTable.jsx'

const backendURL = import.meta.env.VITE_BACKEND_URL

export default function RetrieveLoanDetailPage({ setLoanToEdit }) {
  const [loanDetails, setLoanDetails] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadLoanDetails = async () => {
      try {
        const response = await fetch(`${backendURL}/loandetails`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setLoanDetails(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching loan details:', error)
        setLoanDetails([])
      }
    }

    loadLoanDetails()
  }, [])

  const onDelete = async (id) => {
    const response = await fetch(`/loanDetails/${id}`, { method: 'DELETE' });
    if (response.status === 204) {
      const getResponse = await fetch('/loanDetails');
      const loanDetails = await getResponse.json();
      setLoanDetails(loanDetails);
    }
    else{
      console.error(`Failed to delete loanDetail with id ${id}, status code: ${response.status}`);
    }
  };

  const onEdit = async loanToEdit => {
    setLoanToEdit(loanToEdit);
    navigate(`/edit/${loanToEdit.id_loan_details}`);
  };

  return (
    <section className="card">
      <h2>Loan Details</h2>
      <LoanDetailsTable loanDetails={loanDetails} onEdit={onEdit} onDelete={onDelete} />
    </section>
  )
}

