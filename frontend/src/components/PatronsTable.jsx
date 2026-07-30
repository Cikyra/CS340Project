import PatronsRow from './PatronsRow.jsx'

export default function PatronsTable({ patrons = [] }) {
  const patronList = Array.isArray(patrons) ? patrons : []

  if (!patronList.length) {
    return <p className="empty-message">No patrons recorded.</p>
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Patron ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {patronList.map((patron, index) => (
            <PatronsRow
              key={patron._id || patron.id_patron }
              patron={patron}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
