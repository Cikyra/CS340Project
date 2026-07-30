export default function BookAuthorsRow({ bookAuthor }) {
  const bookAuthorId = bookAuthor?.id_book_has_author
  const bookTitle = bookAuthor?.book_title
  const isbn = bookAuthor?.isbn
  const authorLastName = bookAuthor?.author_lname
  const authorFirstName = bookAuthor?.author_fname


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