/* Citation for the following file
Date: 8/11/2026
Adapted from Laura's previous final project for CS290
*/

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