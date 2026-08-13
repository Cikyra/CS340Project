# Project Title

"Biblio-Tech" Library Database Project

## Overview

This library database project was created as a part of Oregon State University's CS 340 class. It is a database driven web application designed to help support daily library operations and replace manual, error-prone spreadsheets.

The application runs on a normalized relational database structured around the core entities Patrons, Books, Authors, and Loans. It utilizes intersection tables (Books_has_Authors and Loan_Details) to facilitate and manage many-to-many relationships. 

## Architecture / Design

The frontend is a single-page application (SPA) built with **React 18** and **Vite**, communicating with the Express backend over a REST API. The backend is a Node.js/Express REST API (`server.js`) that connects to a MariaDB database via `db-connector.js` and a pooled connection using `mysql2`. Routes are organized by HTTP request (GET, POST, PUT, DELETE, RESET), which call a corresponding SQL stored procedure defined in `PL.sql`. This structure keeps CUD logic in the database layer, improving security and allowing the route handlers to focus on parsing requests, validation, and response.

### Client-side routing
Routing is handled with `react-router-dom`. All routes are declared centrally in [App.jsx](frontend/src/App.jsx) inside a single `<Router>`, so navigation between pages (Books, Authors, Patrons, Loans, Loan Details, Book Authors) never triggers a full page reload — only the `<main>` content swaps out.

### Component organization
The `src` folder is split into two layers with distinct responsibilities:

- **`pages/`** — route-level "container" components (e.g. `RetrieveBooksPage`, `CreateLoanPage`). These own state, fetch data from the backend in `useEffect`, and pass results down as props.
- **`components/`** — "presentational" components that just render data they're given. Each entity follows a **Table + Row** pattern (e.g. `BooksTable` renders a `<table>` and maps over data, delegating each record to a `BooksRow`). This keeps list rendering reusable and keeps markup/formatting logic out of the page components.

### Data fetching
Pages talk to the backend using the native `fetch` API against a base URL read from an environment variable (`import.meta.env.VITE_BACKEND_URL`), following Vite's convention for client-exposed env config. Each page is responsible for its own fetch/error handling (try/catch around `fetch`, checking `response.ok`, defaulting to an empty array on failure).

### Forms
Create/Edit pages (e.g. `CreateLoanPage`) use controlled form inputs plus `react-select` for dropdown and multi-select fields (e.g. picking a patron or multiple books for a loan). Submission is a manual `fetch` POST with basic client-side validation and user feedback via a message state, rather than a form library handling submission.

### Validation 
POST and PUT routes filter requests through dedicated validation functions (`validateDate`, `validateLoan`, `validateLoanDetails`) prior to querying the database. Responses return a `400` on bad input rather than rely on database-level errors to catch bad requests. 

### Stored procedures 
All CREATE, UPDATE, and DELETE operations are implemented as stored procedures in `PL.sql` and are implemented via parameterized `CALL` statements to prevent SQL injection attacks. Procedures include transaction handling (`START TRANSACTION` / `COMMIT` / `ROLLBACK`) and error handling (`EXIT HANDLER FOR SQLEXCEPTION`) to avoid either partial write operations or other data anomalies. 

## How to Run
Before starting the servers, import `DDL.sql` and `PL.sql` into your MySQL/MariaDB instance to create the schema, sample data, and stored procedures. Open a terminal and cd into the frontend folder of the project. Run:

`npm install`

`npm run development`

To run the backend server, cd into the backend folder. Run: 

`npm install`

`node server.js` 

## Example Output 

For example output, please consult the screenshots with comments 

## Known Limitations / Future Work

One reviewer suggested that the backend should update is_checked_out on Books when a loan is created and when a book is returned, so the flag doesn't get out of sync with active loans. Another reviewer suggested adding a confirmation step before DELETE operations. Currently, only the RESET button has a confirm() interface; the delete buttons on EditLoanPage.jsx do not. We have decided to keep confirm() only on RESET given the totalizing nature of this action, but layering in these UI alerts would effectively extend the defensive coding and validation to the frontend via user interface.

## Authors
Jake Pruett & Laura Riley

## Citations
Several sources were used in the making of this project. 
Most all frontend pages were adapted from Laura's previous CS290 final project.

GitHub link for that project: https://github.com/Cikyra/rileylau-a9

This project utilized a frontend React, backend Rest framework that has very similar elements to the CS340 starter code for a React project (npm create vite@latest).

Several files including reactServer.cjs, CreateLoanPage.jsx, db-connector.js, and server.js were copied or adapted from the CS340 starter code. 

In `server.js`: the server initialization logic (i.e., Express/CORS/JSON middleware) is adapted from CS340 Activity 2 starter code, while the basic try/catch + `CALL sp_()` route handler patterns are adapted from CS340 Module 8 exploration "Implementing CUD Operations in your App". In `PL.sql`: the stored procedure structure (i.e., the transaction handling, and parameter-existence checks) follow the CS340 Module 8 exploration. 

One file, the EditLoanPage.jsx, was created using iterative AI prompts from both Google Gemini and Claude. 
Detailed information on these prompts are in the in-file citation at the top.

Please see in-file citations for full source URLs and more specific descriptions of citation scope. 

