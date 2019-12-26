var express = require('express');
var router = express.Router();

const { Pool } = require("pg");
// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "belajar",
//     password: "admin",
//     port: 5432
// });
// console.log("Successful connection to the database");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

module.exports = function(pool){



router.get('/', (req, res) => {
    let result = [];
    let filterData = false;

    if (req.query.check_id && req.query.id) {
        result.push(`id = ${req.query.id}`);
        filterData = true;
    }
    if (req.query.check_string && req.query.string) {
        result.push(`string = '${req.query.string}'`);
        filterData = true;
    }
    if (req.query.check_integer && req.query.integer) {
        result.push(`integer = ${req.query.integer}`);
        filterData = true;
    }
    if (req.query.check_float && req.query.float) {
        result.push(`float = ${req.query.float}`);
        filterData = true;
    }
    if (req.query.check_date && req.query.startDate && req.query.endDate) {
        result.push(`date BETWEEN '${req.query.startDate}' AND '${req.query.endDate}'`);
        filterData = true;
        console.log(req.query)
    }
    if (req.query.check_boolean && req.query.boolean) {
        result.push(`boolean = '${req.query.boolean}'`);
        filterData = true;
        console.log(req.query);
    }

    // count

    let sql = `SELECT COUNT(*) AS total FROM laporan`;
    if (filterData) {
        sql += ` WHERE ${result.join(' AND ')}`
    }
    console.log('sql :' + sql);

    pool.query(sql, (err, count) => {

        console.log('page ' + req.query.page);

        const page = req.query.page || 1;
        // console.log('Page ' + page);
        const limit = 3;
        const offset = (page - 1) * limit;
        // console.log('Offset ' + offset);
        console.log(req.url);

        const url = req.url == '/' ? '/?page=1' : req.url
        // console.log('Url ' + url);
        const total = count.rows[0].total;
        // console.log('Total ' + total);
        const pages = Math.ceil(total / limit);
        // console.log('Pages ' + pages);
        let sql = `SELECT * FROM laporan `;
        if (filterData) {
            sql += ` WHERE ${result.join(' AND ')}`
        }
        sql += ` ORDER BY id LIMIT ${limit} OFFSET ${offset}`;

        pool.query(sql, (err, row) => {
            res.render('index', {
                model: row.rows,
                page,
                pages,
                query: req.query,
                url
            });
        });
    });
});


//GET /delete/5
router.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    const sqlDel = `DELETE FROM laporan WHERE id = $1`;
    pool.query(sqlDel, [id], (err) => {
        if (err) throw err;
        console.log('Delete success')
    })
    res.redirect('/');
});


return router;
}
