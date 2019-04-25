
require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "bamazon_db"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connection ok");
    makeTable();
});

function makeTable() {
    
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        promptSupervisor();
    });
}

function promptSupervisor() {
    
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "What do you want?",
                choices: ["View Product Sales by Department", "Create New Department", "Quit"]
            }
        ])
        .then(function (val) {
            
            switch (val.choice) {
                case "View Product Sales by Department":
                    viewSales();
                    break;
                case "Create New Department":
                    addDepartment();
                    break;
                default:
                    console.log("Get out of Here!");
                    process.exit(0);
                    break;
            }
        });
}

function addDepartment() {
   
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the department?"
            },
            {
                type: "input",
                name: "overhead",
                message: "What is the overhead cost of the department?",
                validate: function (val) {
                    return val > 0;
                }
            }
        ])
        .then(function (val) {
            
            connection.query(
                "INSERT INTO Departments (department_name, over_head_costs) VALUES (?, ?)",
                [val.name, val.overhead],
                function (err) {
                    if (err) throw err;
                    
                    console.log("Department Done");
                    makeTable();
                }
            );
        });
}

function viewSales() {
    
    connection.query(
        
        function (err, res) {
            console.table(res);
            promptSupervisor();
        }
    );
}
