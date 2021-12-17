const express = require("express");
const mysql = require("mysql");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

//use express static folder
//CORS
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DB Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quan_ly_su_kien",
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

// app.post("/api/insert", function (req, res) {
//   message = "";
//   if (!req.files) return res.status(400).send("No files were uploaded.");

//   var file = req.files.uploaded_image;
//   var img_name = file.name;

//   if (
//     file.mimetype == "image/jpeg" ||
//     file.mimetype == "image/png" ||
//     file.mimetype == "image/gif"
//   ) {
//     file.mv("public/images/upload_images/" + file.name, function (err) {
//       if (err) return res.status(500).send(err);
//       var sql =
//         "INSERT " +
//         "INTO event(name,description,image) " +
//         "VALUES('" +
//         req.body.name +
//         "','" +
//         req.body.description +
//         "','" +
//         img_name +
//         "')";

//       connection.query(sql, function (err, results) {
//         if (err) throw err;
//         res.json({ news: results });
//       });
//     });
//   } else {
//     message ="This format is not allowed , please upload file with '.png','.gif','.jpg'";
//   }
// });

app.post("/api/insert", function (req, res) {
  var sql =
    "INSERT " +
    "INTO event(name,description,image) " +
    "VALUES('" +
    req.body.name +
    "','" +
    req.body.description +
    "','" +
    req.body.image +
    "')";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
});



//create connection
app.listen(4000, () => console.log("App listening on port 4000"));
