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

/* GET page edit. */
// GET /edit/5
module.exports = function(pool){

  router.get('/:id', function (req, res, next) {
      const id = req.params.id;
      const bool = req.params.boolean;
      const sql = "SELECT * FROM Laporan WHERE id = $1";
      pool.query(sql, [id], (err, result) => {
          if (err) {
              return console.error(err.message)
          }
          res.render('edit', { model: result.rows[0] });
          console.log(`data ini ${result.boolean}`);
          
      });
  
  });
  
  // POST /edit/5
  router.post("/:id", (req, res) => {
      const id = req.params.id;
      // const book = [req.body.title, req.body.author, req.body.comments, id];
      const data = [
          // req.body.* to access the data posted by the input form
          req.body.string,
          req.body.integer,
          req.body.float,
          req.body.date,
          req.body.boolean,
          id
  
      ];
      
      const sql = "UPDATE Laporan SET string = $1, integer = $2, float = $3, date = $4, boolean = $5 WHERE (id = $6)";
      pool.query(sql, data, (err, result) => {
        if (err) {
          return console.error(err.message);
        }
        res.redirect("/");
      });
    });
  return router;
}
