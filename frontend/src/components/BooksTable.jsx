/* Citation for the following file
Date: 8/11/2026
Adapted from Laura's previous final project for CS290
*/

import BooksRow from './BooksRow.jsx'

export default function BooksTable({ books = [] }) {
  const bookList = Array.isArray(books) ? books : []

  if (!bookList.length) {
    return <p className="empty-message">No books recorded.</p>
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>ISBN</th>
            <th>Checked Out?</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book, index) => (
            <BooksRow
              key={book._id || book.id_book }
              book={book}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
