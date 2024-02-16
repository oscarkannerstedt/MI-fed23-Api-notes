var express = require('express');
var router = express.Router();
const connection = require('../lib/conn.js');

const cors = require('cors');
router.use(cors());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  const {userName, userEmail, userPassword} = req.body;

  const query = `INSERT INTO users (userName, userEmail, userPassword) VALUES (?, ?, ?)`;
  const values = [userName, userEmail, userPassword];

  connection.query(query, values, (err, data) => {
    if (err) {
    console.log("error creating user", err);
    res.status(500).json({error: "error while creating new user"});
    return
    }
    console.log("user created");
    res.status(200).json({message: "User created succesfully"});
  });
});

module.exports = router;
