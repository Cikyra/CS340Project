export default function AuthorsRow({ author }) {
  const authorId = author?.id_author ?? author?.authorID ?? author?.id ?? author?._id ?? 'N/A'
  const firstName = author?.fname ?? author?.first_name ?? author?.firstName ?? author?.FName ?? 'N/A'
  const lastName = author?.lname ?? author?.last_name ?? author?.lastName ?? author?.LName ?? 'N/A'

  return (
    <tr>
      <td>{authorId}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
    </tr>
  )
}