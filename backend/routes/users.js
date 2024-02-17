var express = require('express');
var router = express.Router();
const connection = require('../lib/conn.js');

const cors = require('cors');
router.use(cors());

// Get all users
router.get('/', function(req, res, next) {
  const query = "SELECT * FROM users";

  connection.query(query, (err, data) => {
    if (err) {
      console.log("error get users", err);
      res.status(500).json({error: "Error while get all users"});
      return 
    }

    console.log("users", data);
    res.json(data);
  });
});

// Create new user
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

//Check if user exist
router.post('/login', (req, res) => {
  const { userEmail, userPassword } = req.body;

  const query = `SELECT * FROM users WHERE userEmail = ? AND userPassword = ?`;
  const values = [userEmail, userPassword];

  connection.query(query, values, (err, data) => {
    if (err) {
      console.log("error logging in", err);
      res.status(500).json({ error: "Error while logging in" });
      return;
    }

    if (data.length > 0) {
      console.log("user logged in");
      res.status(200).json({succes: true, user: data[0]});
    } else {
      console.log("user not found");
      res.status(404).json({succes: false, error: "User not found"});
    }
  });
});




module.exports = router;
