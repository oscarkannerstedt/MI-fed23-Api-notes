const express = require('express');
const router = express.Router();
const connection = require('../lib/conn.js');

const cors = require('cors');
router.use(cors());

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

module.exports = router;