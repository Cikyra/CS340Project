/* Citation for the following file
Date: 8/11/2026
Adapted from Laura's previous final project for CS290
*/

export default function BooksRow({ book }) {
  const bookId = book?.id_book
  const title = book?.title
  const isbn = book?.isbn
  const isCheckedOut = book?.is_checked_out


  return (
    <tr>
      <td>{bookId}</td>
      <td>{title}</td>
      <td>{isbn}</td>
      <td>{isCheckedOut}</td>
    </tr>
  )
}