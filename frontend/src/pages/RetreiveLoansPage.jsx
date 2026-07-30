import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoansTable from '../components/LoansTable.jsx'

const backendURL = import.meta.env.VITE_BACKEND_URL

export default function RetrieveLoansPage({ setLoanToEdit }) {
  const [loans, setLoans] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadLoans = async () => {
      try {
        const response = await fetch(`${backendURL}/loans`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setLoans(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching loans:', error)
        setLoans([])
      }
    }

    loadLoans()
  }, [])

  const onDelete = async (id) => {
    const response = await fetch(`/loans/${id}`, { method: 'DELETE' });
    if (response.status === 204) {
      const getResponse = await fetch('/loans');
      const loans = await getResponse.json();
      setLoans(loans);
    }
    else{
      console.error(`Failed to delete loan with id ${id}, status code: ${response.status}`);
    }
  };

  const onEdit = async loanToEdit => {
    setLoanToEdit(loanToEdit);
    navigate(`/edit/${loanToEdit.id_loan}`);
  };

  return (
    <section className="card">

      <button 
        onClick={() => navigate('/loans/create')}>
          New Loan
      </button>

      <h2>Loans</h2>
      <LoansTable loans={loans} onDelete={onDelete} />
    </section>
  )
}