var express = require('express');
var router = express.Router();
const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "belajar",
    password: "admin",
    port: 5432
  });
  console.log("Successful connection to the database");
//add

/* GET page add. */
router.get('/', function(req, res, next) {
    res.render('add');  

  });

  //POST /add
  router.post("/", (req, res) => {
    const sql = "INSERT INTO Laporan(string, integer,float, date, boolean) VALUES ($1, $2, $3, $4, $5)";
    const data = [
        // req.body.* to access the data posted by the input form
        req.body.string,
        req.body.integer,
        req.body.float,
        req.body.date,
        req.body.boolean,

    ];
    pool.query(sql, data, err => {
        //if(err) ...
        if (err) {
            console.error(err.message);
        }
        console.log(`data: ${data} berhasil diinput` );
        
        res.redirect("/")
    });
});
  
  module.exports = router;