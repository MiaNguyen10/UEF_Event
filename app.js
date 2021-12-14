const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quan_ly_su_kien'
});

connection.connect(function (err) {
  err ? console.log(err) : console.log(connection);
});

app.get("/api/event", (req, res) => {
  var sql = "SELECT * FROM event ORDER BY id_event DESC";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  });
});

app.post('/api/insert', function(req, res) {
  var sql = "INSERT "
          + "INTO event(name,description,image) "
          + "VALUES('"
          +   req.body.name+ "','" 
          +   req.body.description + "','" 
          +   req.body.image+"')";
  connection.query(sql, function (err, results) {
    if(err) throw err;
    res.json({news: results});
  });
});
app.listen(4000, () => console.log("App listening on port 4000"));
