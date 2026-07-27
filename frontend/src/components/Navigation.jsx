import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/authors">Authors</Link>
      <Link to="/books">Books</Link>
      <Link to="/loans">Loans</Link>
      <Link to="/patrons">Patrons</Link>
      <Link to="/loandetails">Loan Details</Link>
      <Link to="/bookauthors">Book Authors</Link>
    </nav>
  );
}
