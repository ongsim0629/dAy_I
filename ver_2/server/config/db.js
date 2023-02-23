var mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "euna",
  database: "my_db", //db명

});
module.exports = db;
