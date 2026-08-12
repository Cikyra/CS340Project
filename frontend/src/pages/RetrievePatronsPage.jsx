/* Citation for the following file
Date: 8/11/2026
Adapted from Laura's previous final project for CS290
*/

import { useEffect, useState } from 'react'
import PatronsTable from '../components/PatronsTable.jsx'

const backendURL = import.meta.env.VITE_BACKEND_URL

export default function RetrievePatronsPage() {
  const [patrons, setPatrons] = useState([])

  useEffect(() => {
    const loadPatrons = async () => {
      try {
        const response = await fetch(`${backendURL}/patrons`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setPatrons(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching patrons:', error)
        setPatrons([])
      }
    }

    loadPatrons()
  }, [])


  return (
    <section className="card">
      <h2>Patrons</h2>
      <PatronsTable patrons={patrons}/>
    </section>
  )
  
}