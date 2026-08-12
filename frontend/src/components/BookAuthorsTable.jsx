/* Citation for the following file
Date: 8/11/2026
Adapted from Laura's previous final project for CS290
*/

import BookAuthorsRow from './BookAuthorsRow.jsx'

export default function BookAuthorsTable({ bookAuthors = [] }) {
  const bookAuthorList = Array.isArray(bookAuthors) ? bookAuthors : []

  if (!bookAuthorList.length) {
    return <p className="empty-message">No book authors recorded.</p>
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Book-Author ID</th>
            <th>Book Title</th>
            <th>ISBN</th>
            <th>Last Name</th>
            <th>First Name</th>
          </tr>
        </thead>
        <tbody>
          {bookAuthorList.map((bookAuthor, index) => (
            <BookAuthorsRow
              key={bookAuthor._id || bookAuthor.id_book_has_author }
              bookAuthor={bookAuthor}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
