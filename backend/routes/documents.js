const express = require('express');
const router = express.Router();
const connection = require('../lib/conn.js');

const cors = require('cors');
router.use(cors());

// Get all documents
router.get("/", (req, res) => {

    connection.connect((err) => {
        if (err) console.log("err", err);

        let query = "SELECT * FROM documents WHERE deleted = 0";

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

    connection.connect((err) => {
        if (err) console.log("err", err);

        const query = "SELECT * FROM documents WHERE userId = ? AND deleted = 0";

        connection.query(query, [userId], (err, data) => {
            if (err) {
                console.log("err", err);
                res.status(500).json({error: "Error while getting documents from specific user"});
                return;
            }
    
            console.log("Documents for user:", data);
            res.json(data);
        });
    })
});

// Create new document for a specific user
router.post('/', (req, res) => {
    const { userId, documentName, documentContent } = req.body;

    connection.connect((err) => {
        if (err) console.log("err", err);

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
    })
});

//Update document
router.put('/:id', (req, res) => {
    const documentId = req.params.id;
    const { documentName, documentContent } = req.body;

    connection.connect((err) => {
        if (err) console.log("err", err);

        const query = `UPDATE documents SET documentName = ?, documentContent = ? WHERE id = ?`;
        const values = [documentName, documentContent, documentId];

        connection.query(query, values, (err, data) => {
            if (err) {
                console.log("err", err);
                res.status(500).json({error: "error update documents"});
                return;
            }
    
            console.log("document updated");
            res.status(200).json({message: "Document updated"});
        });
    });
});

// Delete document
router.delete('/:id', (req, res) => {
    const documentId = req.params.id;

    connection.connect((err) => {
        if (err) console.log("err", err);

        const query = `UPDATE documents SET deleted=1 WHERE id = ?`
        const values = [documentId];

        connection.query(query, values, (err, data) => {
            if (err) {
                console.log("err", err);
                res.status(500).json({error: "Error while delete document"});
                return;
            }

            console.log("Document deleted");
            res.status(200).json({message: "Document deleted"});
        });
    });
});


module.exports = router;