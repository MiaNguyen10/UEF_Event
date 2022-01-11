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
  password: "MySQL", // change this
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

//Get on-going events
app.get("/api/event", (req, res) => {
  var sql = "SELECT * FROM event WHERE eventended = 0 ORDER BY id_event DESC";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  }); 
});

//Get ended events
app.get("/api/eventended", (req, res) => {
  var sql = "SELECT * FROM event WHERE eventended = 1 ORDER BY id_event DESC";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  }); 
});

// get event by search 
app.get("/api/searchEvent", (req, res) => {
  let title = req.query.search 
  var sql = "SELECT * FROM event WHERE name like '%" + title + "%' OR description like '%" + title + "%' OR organizationalUnit like '%" + title + "%' OR typeOfEvent like '%" + title + "%'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  }); 
})

// get event by organization unit 
app.get("/api/searchEventUnit", (req, res) => {
  let title = req.query.search 
  var sql = "SELECT * FROM event WHERE organizationalUnit like '%" + title + "%'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  }); 
})

// API for files
app.post('/uploadfile', upload.single('file'), (req, res, next) => {
  //console.log(req.file)
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }

  let fileUrl = `http://localhost:4000/static/${req.file.filename}`
  res.send(fileUrl)
})

//Insert event
app.post("/api/insert", function (req, res) {  
   var sql = "INSERT "
          + "INTO event(name,description,address,image,organizationalUnit,typeOfEvent, eventDate,eventended) "
          + "VALUES('"+
          req.body.name +
          "','" +
          req.body.description +
          "','" +
          req.body.address +
          "','" +
          req.body.image +
          "','" +
          req.body.organizationalUnit +
          "','" +
          req.body.typeOfEvent +
          "', '"+ req.body.eventDate + " " + req.body.eventTime + ":00'" +
          ", 0)";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  });
});

//Edit event
app.post('/api/edit', (req, res) => {
  var sql = "UPDATE event SET "
          +   "name='"+req.body.name+"',"
          +   "description='"+req.body.description+"',"
          +   "address='"+req.body.address+"',"
          +   "image='"+req.body.image+"',"
          +   "organizationalUnit='"+req.body.organizationalUnit+"',"
          +   "typeOfEvent='"+req.body.typeOfEvent+"',"
          +   "eventDate='"+req.body.eventDate + " " + req.body.eventTime + ":00' "
          + "WHERE id_event='"+req.body.id_event+"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({event: results});
  });
});

//End event
app.post('/eventended', (req, res) => {
  var sql = "UPDATE event SET "
          +   "eventended='"+req.body.eventended+"'"
          + "WHERE id_event='"+req.body.id_event+"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({event: results});
  });
});

//Restore event
app.post('/restoreevent', (req, res) => {
  var sql = "UPDATE event SET "
          +   "eventended='"+req.body.eventended+"'"
          + "WHERE id_event='"+req.body.id_event+"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({event: results});
  });
});

//Delete event
app.post('/api/delete', (req, res) => {
  var sql = "DELETE FROM event "
          + "WHERE id_event='"+req.body.id_event+"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({event: results});
  });
});

// login API
app.post("/api/auth", (req, res) => {
  var sql = "SELECT email, name, role FROM account WHERE email='" + req.body.email + "' AND password='" + req.body.password + "'"
  console.log(sql)
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json(results);
  });
})

// student register API
app.post("/api/register", (req, res) => {
  var sql = "INSERT INTO account (email, name, password, role) VALUE ('" + req.body.email + "', '" + req.body.name + "', '" + req.body.password + "', 'student');"
  console.log(sql)
  connection.query(sql, function(err, results) {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") res.json({result: "Email has exsist"})
      else throw err
    } else {
      res.json({result: "sucess"});
    }
  });
})

//create connection
app.listen(4000, () => console.log("App listening on port 4000"));