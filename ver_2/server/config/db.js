var mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "diaryProject", //db명

});
module.exports = db;
