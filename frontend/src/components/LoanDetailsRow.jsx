import { FaEdit, FaTrash } from 'react-icons/fa'

export default function LoanDetailsRow({ loanDetail, onEdit, onDelete }) {
  const loanDetailsId = loanDetail?.id_loan_details
  const loanId = loanDetail?.id_loan
  const patronId = loanDetail?.id_patron
  const patronLastName = loanDetail?.patron_lname
  const patronFirstName = loanDetail?.patron_fname
  const bookTitle = loanDetail?.book_title

  const checkoutDate = loanDetail.checkout_date?.split('T')[0] ?? ''
  const dueDate = loanDetail?.due_date?.split('T')[0] ?? ''
  const dateReturned = loanDetail?.date_returned?.split('T')[0] ?? ''


  return (
    <tr>
      <td>{loanDetailsId}</td>
      <td>{loanId}</td>
      <td>{patronId}</td>
      <td>{patronLastName}</td>
      <td>{patronFirstName}</td>
      <td>{bookTitle}</td>
      <td>{checkoutDate}</td>
      <td>{dueDate}</td>
      <td>{dateReturned}</td>
      <td className="actions">
          <button type="button" onClick={() => onEdit(loanDetail)}>
            <FaEdit />
          </button>
          <button type="button" onClick={() => onDelete(loanDetail.id_loan_details)}>
            <FaTrash />
          </button>
      </td>
    </tr>
  )
}