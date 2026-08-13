/* Citation for the following file
Date: 8/11/2026
Adapted from Laura's previous final project for CS290
*/

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