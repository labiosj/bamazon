require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "bamazon_db"
});


connection.connect(function (err) {
    if (err) return err;

   
    products();
});

function products() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) return err;

        console.log('');
        console.log('-------------Inventory---------------');
        console.log('');


        for (var i = 0; i < res.length; i++) {
            console.log('Item id: ' + res[i].item_id);
            console.log('Product name: ' + res[i].product_name);
            console.log('department name: ' + res[i].department_name);
            console.log('Price: ' + res[i].price);
            console.log('Quantity: ' + res[i].Stock_quantity);
            console.log(' ');
            console.log(' ');

        }
    
        start();
    });
}


function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) return console.log("connection error:" + err);
    inquirer
        .prompt([
                {
                    name: 'selectId',
                    type: 'input',
                    message: 'Enter the id number you want to purchase:',


        },

                {
                    name: 'amountBought',
                    type: 'input',
                    message: 'How many would you like?',
                }
            ]).then (function (answers) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, {
                item_id: answers.selectId
            }, function (err, res) {


              

                var inStock = res[0].Stock_quantity;
                var itemBought = answers.amountBought;

                if (inStock >= itemBought) {
                    var leftInStock = inStock - itemBought;
                    
                    var totalPrice = res[0].price * itemBought;
                    var itemPurchased = res[0].product_name;
                    
                    console.log(totalPrice + "  total price of items bought");
                    
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [
                            {
                                Stock_quantity: leftInStock
                                
                        },
                            {
                                item_id: answers.selectId
                        }

                    ],
                        function (error) {

                            if (error) return err;
                            console.log("==============================================");
                            console.log("\n\r");
                            console.log("Order details:");
                            console.log("Item bought " + itemPurchased);
                            console.log("Quanity bought " + itemBought + " for $" + res[0].price);
                            console.log("Total Cost: $" + totalPrice);
                            console.log("\n\r");
                            console.log("Thank you for shopping with us.");
                            console.log("==============================================");
                            products();

                        }
                    );
                } else {
                    console.log("==============================================");
                    console.log("\n\r");
                    console.log("Not enough of that product");
                    console.log("\n\r");
                    console.log("==============================================");
                   products();

                }

            });
        
        });
        });
    }