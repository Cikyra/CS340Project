/*Citation for the following file
Date: 8/12/2026
Adapted from CS340 Activity 2 starter code (server set up). Used to initialize the express server, and the express.json/cors middleware.
Source URL: https://canvas.oregonstate.edu/courses/2051721/assignments/10565906?module_item_id=26923289
Adapted from CS340 Module 8, "Implementing CUD Operations in your App". Used to incorporate basic try/catch route handler structure, 
as well as the 'CALL sp ...' syntax; modified for REST API; added my own validation logic and loop structure for create loan event.
Source URL: https://canvas.oregonstate.edu/courses/2051721/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26923368
*/


// server set up (see Activity 2 citation) 
const db = require('./db-connector');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4578;

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests, good thing to know



// route handlers (see Module 8 citation)

// -----------------------------------------------------------------------------------
//  All Get Requests
// -----------------------------------------------------------------------------------
            
// Route handler: Get all Authors
app.get('/authors', async (req, res) => {
    try{
        const query1 = 'SELECT * FROM Authors;'        
        const [rows] = await db.query(query1);
        res.status(200).json(rows)
    }catch(error){
        console.error("Error fetching Authors.");
        res.status(500).send("An error occurred while fetching Authors.");
    }
});

// Route handler: Get all Books
app.get('/books', async (req, res) => {
    try{
        const query1 = 'SELECT * FROM Books;'        
        const [rows] = await db.query(query1);
        res.status(200).json(rows)
    }catch(error){
        console.error("Error fetching Books.");
        res.status(500).send("An error occurred while fetching books.");
    }
});


// Route handler: Get all Patrons
app.get('/patrons', async (req, res) => {
    try{
        const query1 = 'SELECT * FROM Patrons;'
        const [rows] = await db.query(query1);
        res.status(200).json(rows)
    }catch(error){
        console.error("Error fetching Patrons.");
        res.status(500).send("An error occurred while fetching patrons.");
    }
});

// Route handler: Get all Loans
app.get('/loans', async (req, res) => {
    try{
        const query1 = `SELECT 
                            Loans.id_loan, 
                            Patrons.id_patron, 
                            Patrons.lname AS patron_lname, 
                            Patrons.fname AS patron_fname, 
                            Loans.checkout_date
                        FROM Loans
                        INNER JOIN Patrons ON Loans.id_patron = Patrons.id_patron
                        ORDER BY Loans.id_loan ASC;`
        const [rows] = await db.query(query1);
        res.status(200).json(rows)
    }catch(error){
        console.error("Error fetching Loans.");
        res.status(500).send("An error occurred while fetching loans.");
    }
});

// Route handler: Get all Loan_Details
app.get('/loandetails', async (req, res) => {
    try{
        const query1 = `SELECT 
                            Loan_Details.id_loan_details, 
                            Loans.id_loan, 
                            Patrons.id_patron, 
                            Patrons.lname AS patron_lname, 
                            Patrons.fname AS patron_fname, 
                            Books.title AS book_title, 
                            Loans.checkout_date, 
                            Loan_Details.due_date, 
                            Loan_Details.date_returned
                        FROM Loan_Details
                        INNER JOIN Books ON Loan_Details.id_book = Books.id_book
                        INNER JOIN Loans ON Loan_Details.id_loan = Loans.id_loan
                        INNER JOIN Patrons ON Loans.id_patron = Patrons.id_patron
                        ORDER BY Loan_Details.due_date ASC;`
        const [rows] = await db.query(query1);
        res.status(200).json(rows)
    }catch(error){
        console.error("Error fetching Loan_Details.");
        res.status(500).send("An error occurred while fetching loan details.")
    }
});

// Route handler: Get all Books_has_Authors 
app.get('/bookauthors', async(req,res) => {
    try{
        const query1 = `SELECT 
                            Books_has_Authors.id_book_has_author, 
                            Books.title AS book_title, 
                            Books.isbn, 
                            Authors.lname AS author_lname, 
                            Authors.fname AS author_fname
                        FROM Books_has_Authors
                        INNER JOIN Books ON Books_has_Authors.id_book = Books.id_book
                        INNER JOIN Authors ON Books_has_Authors.id_author = Authors.id_author
                        ORDER BY Books_has_Authors.id_book_has_author;`
        const [rows] = await db.query(query1);
        res.status(200).json(rows)
    }catch(error){
        console.error("Error fetching Books_has_Authors.");
        res.status(500).send("An error occurred while fetching book-author details.")
    }
});


// -----------------------------------------------------------------------------------
//  All Post Requests
// -----------------------------------------------------------------------------------


function validateDate(date) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date)
}

function validateLoan(properties) {
    const {id_patron, checkout_date, books} = properties
    if (!id_patron || !Number.isInteger(id_patron)) {return false}
    if (!checkout_date || !validateDate(checkout_date)) {return false}
    if (!Array.isArray(books) || books.length === 0) {return false}
    

    for (let i=0; i < books.length; i++) {
        if (!books[i]) {return false}
        if (!books[i].id_book || !books[i].due_date) {return false}
        if (!Number.isInteger(books[i].id_book)) {return false}
        if (!validateDate(books[i].due_date)) {return false}
    }
    return true
}

app.post('/loans/create', async(req,res) => {
    if (!validateLoan(req.body)) {
        return res.status(400).send("Improperly formatted request.")
    }
    const loanEvent = req.body
    const {id_patron, checkout_date, books} = loanEvent
    
    // createLoanEvent
    try{
        // call sp_create_loan_event. pass @id_loan as output parameter
        await db.query(
            `CALL sp_create_loan_event(?, ?, @id_loan)`,
            [id_patron, checkout_date]
        );

        const [[{id_loan}]] = await db.query(`SELECT @id_loan AS id_loan`);

        // create new Loan_Details row(s)
        for (const book of books) {
            
            const id_book = book.id_book
            const due_date = book.due_date
            const date_returned = null
            
            await db.query(
                `CALL sp_create_loan_event_details(?, ?, ?, ?, @id_loan_details)`,
                [id_loan, id_book, due_date, date_returned]
            );
            // id_loan_details not used, but still made available
            const [[{id_loan_details}]] = await db.query(`SELECT @id_loan_details AS id_loan`)
        }
            
        res.status(201).send("Loans and Loan_Details successfully created")

    }catch(error){
        res.status(500).send("An error occurred while creating new Loan event and Loan_Details.")
        console.error(error)
}})


// -----------------------------------------------------------------------------------
//  All Put Requests
// -----------------------------------------------------------------------------------

function validateLoanDetails(properties, id_loan_details) {
    const {due_date, date_returned} = properties
    if (!validateDate(due_date)) {return false}
    if (date_returned !== null && !validateDate(date_returned)) {return false}
    if (!Number.isInteger(id_loan_details)) {return false}
    return true
}

app.put('/loandetails/:_id', async(req,res) => {
        const id_loan_details = Number(req.params._id)

        if (!validateLoanDetails(req.body, id_loan_details)) {
            return res.status(400).send("Improperly formatted request.")
        }

        const loanUpdate = req.body
        const{due_date, date_returned} = loanUpdate
        
        // update Loan_Details
        try{
            await db.query(
                `CALL sp_update_loan_details(?, ?, ?)`,
                [id_loan_details, due_date, date_returned]
            );
            res.status(200).send("Loan_Details successfully updated.")
        }catch(error){
            res.status(500).send("An error occurred while updating Loan_Details.")
            console.error(error)
        }})


// -----------------------------------------------------------------------------------
//  All DELETE Requests
// -----------------------------------------------------------------------------------

app.delete('/loandetails/:_id', async(req,res) => {
    const id_loan_details = Number(req.params._id)
    if (!Number.isInteger(id_loan_details)) {
        return res.status(400).send("Improperly formatted request.")}

    try{
        await db.query(
            `CALL sp_delete_loanDetail_book(?)`,
            [id_loan_details]
        );
        res.status(204).send()
    }catch(error){
        res.status(500).send("An error occurred while deleting this record.")
        console.error(error)
    }})

app.delete('/loans/:_id', async(req,res) => {
    const id_loan = Number(req.params._id)
    if (!Number.isInteger(id_loan)) {
        return res.status(400).send("Improperly formatted request")}

    try{
        await db.query(
            `CALL sp_delete_loan(?)`,
            [id_loan]
        );
        res.status(204).send()
    }catch(error){
        res.status(500).send("An error occurred while deleting this record.")
        console.error(error)
    }
})

// -----------------------------------------------------------------------------------
//  RESET
// -----------------------------------------------------------------------------------
app.post('/reset', async(req,res) => {
    try{
        await db.query(
            `CALL sp_restore_database()`,
        );
        res.status(200).send("Database reset successful.")
    }catch(error){
        res.status(500).send("An error occurred while reseting the database")
        console.error(error)
    }
})





// Tell express what port to listen on 
app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});