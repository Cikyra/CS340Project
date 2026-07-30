import { FaEdit, FaTrash } from 'react-icons/fa'

export default function LoansRow({ loan, onDelete }) {
  const loanId = loan?.id_loan
  const patronId = loan?.id_patron
  const patronLastName = loan?.fname
  const patronFirstName = loan?.lname
  const checkoutDate = loan?.checkout_date


  return (
    <tr>
      <td>{loanId}</td>
      <td>{patronId}</td>
      <td>{patronLastName}</td>
      <td>{patronFirstName}</td>
      <td>{checkoutDate}</td>
      <td className="actions">
        <button type="button" onClick={() => onDelete(loan.id_loan)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}