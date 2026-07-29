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