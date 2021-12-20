const express = require("express");
const mysql = require("mysql");
const app = express();
const multer = require("multer");
const path = require("path");
// const cors = require("cors"); // dont need cors
const bodyParser = require("body-parser");

//CORS
// app.use(cors()); // dont need cors
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// config file storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/upload_images') // localtion store file
  },
  filename: function (req, file, cb) {
    cb(null, "upload" + '-' + Date.now() + "_" + file.originalname) // config filename
  }
})
var upload = multer({ storage: storage })

//DB Connection
const connection = mysql.createConnection({
  host: "localhost", 
  user: "root", // change this
  password: "", // change this
  database: "quan_ly_su_kien",
});

connection.connect(function (err) {
  err ? console.log(err) : console.log();
});


// API part
app.get("/", (req, res) => {
  res.send("API server")
})
app.use("/static", express.static("public/images/upload_images")); // host static file

app.get("/api/event", (req, res) => {
  var sql = "SELECT * FROM event ORDER BY id_event DESC";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  });
});


// API for files
app.post('/uploadfile', upload.single('file'), (req, res, next) => {
  console.log(req.file)
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }

  let fileUrl = `http://localhost:4000/static/${req.file.filename}`
  res.send(fileUrl)
})

app.post("/api/insert", function (req, res) {  
  var sql =
    "INSERT " +
    "INTO event(name,description,image, eventended) " +
    "VALUES('" +
    req.body.name +
    "','" +
    req.body.description +
    "','" +
    req.body.image +
    "', 0)";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  });
});

app.post('/api/edit', (req, res) => {
  var sql = "UPDATE event SET "
          +   "name='"+req.body.name+"',"
          +   "description='"+req.body.description+"',"
          +   "image='"+req.body.image+"'"
          + "WHERE id_event='"+req.body.id_event+"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({event: results});
  });
});

app.post('/api/delete', (req, res) => {
  var sql = "DELETE FROM event "
          + "WHERE id_event='"+req.body.id_event+"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({event: results});
  });
});

//create connection
app.listen(4000, () => console.log("App listening on port 4000"));