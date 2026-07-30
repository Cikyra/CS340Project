/*Citation for thew following file
Date: 7/27/2026
Adapted from CS340 Activity 2 starter code
Wrote in my own route handlers
*/

const db = require('./db-connector');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4578;

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests, good thing to know
            
// Route handler 
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

app.get('/books', async (req, res) => {
    try{
        const query1 = 'SELECT * FROM Books;'        
        const [rows] = await db.query(query1);
        res.status(200).json(rows)
    }catch(error){
        console.error("Error fetching books.");
        res.status(500).send("An error occurred while fetching books.");
    }
});

// Tell express what port to listen on 
app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});