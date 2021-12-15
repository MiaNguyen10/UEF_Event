const express = require("express");
const mysql = require("mysql");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

//use express static folder
//CORS
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

//! Use of Multer
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    const ext = file.mimetype.split("/")[1];
    callBack(null, `uploads/${file.originalname} - ${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: storage,
});

//@type   POST
//route for post data
app.post("/api/image", upload.single("image"), (req, res, err) => {
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    res.send({ msg: "Only image files (jpg, jpeg, png) are allowed!" });
  } else {
    const image = req.file.filename;
    const id=1;

    const sqlInsert = "UPDATE event SET `image` = ? WHERE id = ?;"
    connection.query(sqlInsert, [image, id] , (err, result) => {
      if(err) {
        console.log(err)
        res.send({
          msg:err
        })
      }

      if(result){
        res.send({
          data: result,
          msg: 'Your image has been updates!'
        });
      }
    });
  }
});

//create connection
app.listen(4000, () => console.log("App listening on port 4000"));
