const express = require('express');
const router = express.Router();
const connection = require('../lib/conn.js');

const cors = require('cors');
router.use(cors());

// Get all documents
router.get("/", (req, res) => {

    connection.connect((err) => {
        if (err) console.log("err", err);

        let query = "SELECT * FROM documents";

        connection.query(query, (err, data) => {
            if (err) console.log("err", err);

            console.log("documents", data);
            res.json(data);
        })
    })
})

//Get documents for a specific user
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = "SELECT * FROM documents WHERE userId = ?";

    connection.query(query, [userId], (err, data) => {
        if (err) {
            console.log("err", err);
            res.status(500).json({error: "Error while getting documents from specific user"});
            return;
        }

        console.log("Documents for user:", data);
        res.json(data);
    })
})

// Create new document for a specific user
router.post('/', (req, res) => {
    const { userId, documentName, documentContent } = req.body;

    const query = `INSERT INTO documents (userId, documentName, documentContent) VALUES (?, ?, ?)`;
    const values = [userId, documentName, documentContent];

    connection.query(query, values, (err, data) => {
        if (err) {
            console.log("err", err);
            res.status(500).json({ error: "Error creating new document" });
            return;
        }

        console.log("Document created");
        res.status(200).json({message: "Document created"});
    });
});

module.exports = router;