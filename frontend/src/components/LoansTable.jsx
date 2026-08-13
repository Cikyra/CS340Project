/* Citation for the following file
Date: 8/11/2026
Adapted from Laura's previous final project for CS290
*/

import LoansRow from './LoansRow.jsx'

export default function LoansTable({ loans = [], onDelete }) {
  const loanList = Array.isArray(loans) ? loans : []

  if (!loanList.length) {
    return <p>Loans Page</p>
    //TODO: uncomment this once routes are set up
    // return <p className="empty-message">No loans recorded.</p>
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Patron ID</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Checkout Date</th>
          </tr>
        </thead>
        <tbody>
          {loanList.map((loan, index) => (
            <LoansRow
              key={loan._id || loan.id_loan }
              loan={loan}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
