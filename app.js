const express = require("express");
const mysql = require("mysql");
const app = express();
const multer = require("multer");
const path = require("path");
// const cors = require("cors"); // dont need cors
const bodyParser = require("body-parser");
const { log } = require("console");

//CORS
// app.use(cors()); // dont need cors
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config file storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/upload_images"); // localtion store file
  },
  filename: function (req, file, cb) {
    cb(null, "upload" + "-" + Date.now() + "_" + file.originalname); // config filename
  },
});
var upload = multer({ storage: storage });

//DB Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // change this
  password: "", // change this
  database: "event_management",
});

connection.connect(function (err) {
  err ? console.log(err) : console.log();
});

// API part
app.get("/", (req, res) => {
  res.send("API server");
});
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
  let title = req.query.search;
  var sql =
    "SELECT * FROM event WHERE name like '%" +
    title +
    "%' OR description like '%" +
    title +
    "%' OR organizationalUnit like '%" +
    title +
    "%' OR typeOfEvent like '%" +
    title +
    "%'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  });
});

// get event by organization unit
app.get("/api/searchEventUnit", (req, res) => {
  let title = req.query.search;
  var sql =
    "SELECT * FROM event WHERE organizationalUnit like '%" + title + "%'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  });
});

// API for files
app.post("/uploadfile", upload.single("file"), (req, res, next) => {
  //console.log(req.file)
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  let fileUrl = `http://localhost:4000/static/${req.file.filename}`;
  res.send(fileUrl);
});

//Insert event
app.post("/api/insert", function (req, res) {
  var sql =
    "INSERT " +
    "INTO event(name,description,address,image,organizationalUnit,typeOfEvent, eventDate,eventended) " +
    "VALUES('" +
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
    "', '" +
    req.body.eventDate +
    " " +
    req.body.eventTime +
    ":00'" +
    ", 0)";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  });
});

//Edit event
app.post("/api/edit", (req, res) => {
  var sql =
    "UPDATE event SET " +
    "name='" +
    req.body.name +
    "'," +
    "description='" +
    req.body.description +
    "'," +
    "address='" +
    req.body.address +
    "'," +
    "image='" +
    req.body.image +
    "'," +
    "organizationalUnit='" +
    req.body.organizationalUnit +
    "'," +
    "typeOfEvent='" +
    req.body.typeOfEvent +
    "'," +
    "eventDate='" +
    req.body.eventDate +
    " " +
    req.body.eventTime +
    ":00' " +
    "WHERE id_event='" +
    req.body.id_event +
    "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  });
});

//End event
app.post("/eventended", (req, res) => {
  var sql =
    "UPDATE event SET " +
    "eventended='" +
    req.body.eventended +
    "'" +
    "WHERE id_event='" +
    req.body.id_event +
    "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  });
});

//Restore event
app.post("/restoreevent", (req, res) => {
  var sql =
    "UPDATE event SET " +
    "eventended='" +
    req.body.eventended +
    "'" +
    "WHERE id_event='" +
    req.body.id_event +
    "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  });
});

//Delete event
app.post("/api/delete", (req, res) => {
  var sql = "DELETE FROM event " + "WHERE id_event='" + req.body.id_event + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  });
});

//get admim account of faculties
app.get("/api/account", (req, res) => {
  const role = "Khoa";
  var sql = "SELECT * FROM account WHERE role like '" + role + "%'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ account: results });
  });
});

//Edit account
app.post("/api/editaccount", (req, res) => {
  var sql =
    "UPDATE account SET " +
    "email='" +
    req.body.email +
    "'," +
    "name='" +
    req.body.name +
    "'," +
    "password='" +
    req.body.password +
    "'," +
    "role='" +
    req.body.role +
    "'" +
    "WHERE id='" +
    req.body.id +
    "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ account: results });
  });
});

//Delete account
app.post("/api/deleteaccount", (req, res) => {
  var sql = "DELETE FROM account " + "WHERE id='" + req.body.id + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ account: results });
  });
});

// login API
app.post("/api/auth", (req, res) => {
  var sql =
    "SELECT id, email, name, studentCode, userclass, faculty, role FROM account WHERE email='" +
    req.body.email +
    "' AND password='" +
    req.body.password +
    "'";
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json(results);
  });
});

// student register API
app.post("/api/register", (req, res) => {
  var sql =
    "INSERT INTO account (email, name, password, studentCode, userclass, faculty, role) VALUE ('" +
    req.body.email +
    "', '" +
    req.body.name +
    "', '" +
    req.body.password +
    "', '" +
    req.body.studentCode +
    "', '" +
    req.body.userclass +
    "', '" +
    req.body.faculty +
    "', 'student');";
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") res.json({ result: "Email has exsist" });
      else throw err;
    } else {
      res.json({ result: "sucess" });
    }
  });
});

//get student account
app.get('/api/accountstudent', (req, res) => {
  var sql = "SELECT * FROM account WHERE id =" + req.query.id + "";  
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({account: results});
  });
});

//edit student account
app.post('/api/editAccount', (req, res) => {
  const role="student"
  var sql = "UPDATE account SET "
          +   "email='"+req.body.email+"',"
          +   "name='"+req.body.name+"',"
          +   "password='"+req.body.password+"',"
          +   "studentCode='"+req.body.studentCode+"',"
          +   "userclass='"+req.body.userclass+"',"
          +   "faculty='"+req.body.faculty+"',"
          +   "role='"+req.body.role+"'"
          + "WHERE id='"+req.body.id+"'";

  console.log(sql);
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({account: results});
  });
});


// admin register API
app.post("/api/registeradmin", (req, res) => {
  var sql =
    "INSERT INTO account (email, name, password, role) VALUE ('" +
    req.body.email +
    "', '" +
    req.body.name +
    "', '" +
    req.body.password +
    "','" +
    req.body.role +
    "')";
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") res.json({ result: "Email has exsist" });
      else throw err;
    } else {
      res.json({ result: "sucess" });
    }
  });
});

// add to favorite API
app.post("/api/favorite/add", (req, res) => {
  var sql =
    "INSERT INTO favourite_event (id_account, id_event) VALUE ('" + req.body.id_account + "', '" + req.body.id_event + "')";
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") res.json({ result: "Event has been in database" });
      else throw err;
    } else {
      res.json({ result: "sucess" });
    }
  });
})

// get favorite event API
app.get("/api/favorite/get", (req, res) => {
  var sql =  "select * from favourite_event f join event e on e.id_event = f.id_event "
  + `where id_account = ${req.query.id};`
  console.log('sql', sql);
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({event: results});
  });
})

// delete favourite event AP
app.delete("/api/favorite/delele", (req, res) => {
  var sql =  "delete from favourite_event"
  + ` where id_account = ${req.query.id_account} and id_event=${req.query.id_event};`
  console.log('sql', sql);
  connection.query(sql, function(err, results) {
    if (err) {
      res.json({results: "Error when delete"})
      throw err;
    }
    res.json({results: "sucess"});
  });
})

// get event by search in Favorite
app.get("/api/searchFavEvent", (req, res) => {
  let title = req.query.search;
  var sql =
    "SELECT * FROM favourite_event f join event e on e.id_event = f.id_event WHERE (f.id_account=13 and name like '%" +
    title +
    "%') OR (f.id_account=13 and description like '%" +
    title +
    "%') OR ( f.id_account=13 and organizationalUnit like '%" +
    title +
    "%') OR ( f.id_account=13 and typeOfEvent like '%" +
    title +
    "%')";
  console.log(sql)
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ event: results });
  });
});

//create connection
app.listen(4000, () => console.log("App listening on port 4000"));
