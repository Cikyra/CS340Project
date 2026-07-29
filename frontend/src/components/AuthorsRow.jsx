export default function AuthorsRow({ author }) {
  const authorId = author?.id_author 
  const firstName = author?.fname
  const lastName = author?.lname

  return (
    <tr>
      <td>{authorId}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
    </tr>
  )
}