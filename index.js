const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const { inherits } = require("util");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  init();
});

async function init() {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "How would you like to interact with the employee database?",
    choices: [
      "Add new entries",
      "View existing entries",
      "Update existing entries",
      "Exit database",
    ],
  });
  if (action == "Add new entries") {
    await addEntries();
  } else if (action == "View existing entries") {
    await viewEntries();
  } else if (action == "Update existing entries") {
    updateEntries();
  } else {
    connection.end();
  }
}

async function addEntries() {
  // Determines what to add
  const { category } = await inquirer.prompt({
    type: "list",
    name: "category",
    message: "Would you like to add a department, role, or employee?",
    choices: ["Department", "Role", "Employee"],
  });
  // Necessary question regardless of response
  const { name } = await inquirer.prompt({
    type: "input",
    name: "name",
    message: `What is the full name of this new ${category}?`,
  });
  if (category == "Department") {
    // No department-specific questions must be asked, so the query is immediately made
    connection.query("INSERT INTO department SET ?", { title: name }, (err) => {
      if (err) throw err;
    });
  } else if (category == "Role") {
    // Additional questions are necessary, so those are asked before the query is made
    const { salary } = await inquirer.prompt({
      type: "number",
      name: "salary",
      message: "What is the default salary of this role?",
    });
    const { department_id } = await inquirer.prompt({
      type: "number",
      name: "department_id",
      message: "What is the department ID of this role?",
    });

    connection.query(
      "INSERT INTO roles SET ?",
      { title: name, salary: salary, department_id: department_id },
      (err) => {
        if (err) throw err;
      }
    );
  } else {
    // Additional questions are necessary, so those are asked before the query is made
    let [first_name, ...last_name] = name.split(" ");
    last_name = last_name.join(" ");
    const { role_id } = await inquirer.prompt({
      type: "number",
      name: "role_id",
      message: "What is the role ID of this employee's position?",
    });
    const { manager_id } = await inquirer.prompt({
      type: "number",
      name: "manager_id",
      message: "What is the ID of the manager in charge of this employee?",
    });
    connection.query(
      "INSERT INTO employee SET ?",
      { first_name: first_name, last_name: last_name, role_id: role_id, manager_id: manager_id },
      (err) => {
        if (err) throw err;
      }
    );
  }
  console.log(`Successfully created new ${name} ${category}!`);
  init();
}

async function viewEntries() {
  const {category} = await inquirer.prompt({
    type: 'list',
    name: 'category',
    message: 'Which category would you like to view the entries of?',
    choices: [
      'Departments',
      'Roles',
      'Employees',
      'Combined'
    ]
  })
  switch (category) {
    case 'Departments':
      connection.query(
        "SELECT * FROM department", (err, res) => {
          if (err)
            throw err;
          console.table(res);
        }
      )
      break;
    case 'Roles':
      connection.query(
        "SELECT * FROM roles", (err, res) => {
          if (err)
            throw err;
          console.table(res);
        }
      )
      break;
    case 'Employees':
      connection.query(
        "SELECT * FROM employee", (err, res) => {
          if (err)
            throw err;
          console.table(res);
        }
      )
      break;
    case 'Combined':
      connection.query(
        "SELECT employee.last_name, employee.first_name, roles.title, department.department, roles.salary FROM ((department INNER JOIN roles ON department.id = roles.department_id) INNER JOIN employee ON employee.role_id = roles.id)", (err, res) => {
          if (err)
            throw err;
          console.table(res);
        }
      )
  }
  init();
}

function updateEntries() {}
