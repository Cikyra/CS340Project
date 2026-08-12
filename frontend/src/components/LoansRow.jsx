/* Citation for the following file
Date: 8/11/2026
Adapted from Laura's previous final project for CS290
*/

import { FaEdit, FaTrash } from 'react-icons/fa'

export default function LoansRow({ loan, onDelete }) {
  const loanId = loan?.id_loan
  const patronId = loan?.id_patron
  const patronLastName = loan?.patron_fname
  const patronFirstName = loan?.patron_lname
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