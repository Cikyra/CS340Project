export default function BookAuthorsRow({ bookAuthor }) {
  const bookAuthorId = bookAuthor?.id_book_has_author
  const bookTitle = bookAuthor?.title
  const isbn = bookAuthor?.isbn
  const authorLastName = bookAuthor?.lname
  const authorFirstName = bookAuthor?.fname


  return (
    <tr>
      <td>{bookAuthorId}</td>
      <td>{bookTitle}</td>
      <td>{isbn}</td>
      <td>{authorLastName}</td>
      <td>{authorFirstName}</td>
    </tr>
  )
}