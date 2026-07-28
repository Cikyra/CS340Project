import AuthorsRow from './AuthorsRow.jsx'

export default function AuthorsTable({ authors = [] }) {
  const authorList = Array.isArray(authors) ? authors : []

  if (!authorList.length) {
    return <p className="empty-message">No authors recorded.</p>
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Author ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {authorList.map((author, index) => (
            <AuthorsRow
              key={author._id || author.id_author }
              author={author}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
