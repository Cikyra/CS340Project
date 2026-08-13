/* Citation for the following file
Date: 8/11/2026
Adapted from Laura's previous final project for CS290
*/

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthorsTable from '../components/AuthorsTable.jsx'

const backendURL = import.meta.env.VITE_BACKEND_URL

export default function RetrieveAuthorsPage() {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const response = await fetch(`${backendURL}/authors`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setAuthors(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching authors:', error)
        setAuthors([])
      }
    }

    loadAuthors()
  }, [])

  return (
    <section className="card">
      <h2>Authors</h2>
      <p>All recorded authors are below.</p>
      <AuthorsTable authors={authors} />
    </section>
  )
}