const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  inquirer
    .prompt({
      type: "checkbox",
      name: "action",
      message: "How would you like to interact with the employee database?",
      choices: [
        "Add new entries",
        "View existing entries",
        "Update existing entries",
      ],
    })
    .then((answer) => {
        if (answer.action === "Add new entries") {
            addEntries();
        } else if (answer.action === 'View existing entries') {
            viewEntries();
        } else {
            updateEntries();
        }
    });
});

function addEntries() {

}

function viewEntries() {

}

function updateEntries() {

}