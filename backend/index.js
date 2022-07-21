const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "electric_board",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/get", (req, res) => {
  const sqlGet = "SELECT * FROM electric_bill_record;";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});
app.post("/get/insert", (req, res) => {
  const bill = req.body.bill;
  const pay = req.body.pay;
  const unit = req.body.unit;
  const amt = req.body.amt;
  const name = req.body.name;

  const sqlInsert =
    "INSERT INTO electric_bill_record (bill_date,paid_date,unit,amount,name) VALUES (?,?,?,?,?);";
  db.query(sqlInsert, [bill, pay, unit, amt, name], (err, result) => {
    console.log(result);
  });
});

app.delete("/get/delete/:name", (req, res) => {
  const name = req.params.name;

  const sqlDelete = "DELETE FROM electric_bill_record WHERE name=?";

  db.query(sqlDelete, name, (err, result) => {
    console.log(err);
  });
});

app.listen(5001, () => {
  console.log(`Running on port 5001`);
});
