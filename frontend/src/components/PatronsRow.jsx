export default function PatronsRow({ patron }) {
  const patronId = patron?.id_patron
  const firstName = patron?.fname
  const lastName = patron?.lname


  return (
    <tr>
      <td>{patronId}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
    </tr>
  )
}