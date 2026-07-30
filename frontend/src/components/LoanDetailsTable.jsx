import LoanDetailsRow from './LoanDetailsRow.jsx'

export default function LoanDetailsTable({ loanDetails = [], onEdit, onDelete }) {
  const loanDetailList = Array.isArray(loanDetails) ? loanDetails : []

  if (!loanDetailList.length) {
    return <p>Loan Detials Page</p>
    //TODO: uncommnent this once routes are set up
    // return <p className="empty-message">No loan details recorded.</p>
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Loan Detail ID</th>
            <th>Loan ID</th>
            <th>Patron ID</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Book</th>
            <th>Checkout Date</th>
            <th>Due Date</th>
            <th>Date Returned</th>
          </tr>
        </thead>
        <tbody>
          {loanDetailList.map((loanDetail, index) => (
            <LoanDetailsRow
              key={loanDetail._id || loanDetail.id_loan_details }
              loanDetail={loanDetail}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
