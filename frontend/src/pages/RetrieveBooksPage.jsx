/* Citation for the following file
Date: 8/11/2026
Adapted from Laura's previous final project for CS290
*/

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BooksTable from '../components/BooksTable.jsx'

const backendURL = import.meta.env.VITE_BACKEND_URL

export default function RetrieveBooksPage() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch(`${backendURL}/books`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setBooks(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching books:', error)
        setBooks([])
      }
    }

    loadBooks()
  }, [])

  return (
    <section className="card">
      <h2>Books</h2>
      <p>Browse the library's books.</p>
      <BooksTable books={books} />
    </section>
  )
}