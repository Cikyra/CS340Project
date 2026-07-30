import { useEffect, useState } from 'react'
import BookAuthorsTable from '../components/BookAuthorsTable.jsx'


const backendURL = import.meta.env.VITE_BACKEND_URL


export default function RetrieveBookAuthorsPage() {

  const [bookAuthors, setBookAuthors] = useState([])

  useEffect(() => {
    const loadBookAuthors = async () => {
      try {
        const response = await fetch(`${backendURL}/bookauthors`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setBookAuthors(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching bookAuthors:', error)
        setBookAuthors([])
      }
    }

    loadBookAuthors()
  }, [])


  return (
    <section className="card">
      <h2>Book Authors</h2>
      <BookAuthorsTable bookAuthors={bookAuthors}/>
    </section>
  )
  
}