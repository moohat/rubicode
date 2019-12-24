const express = require('express');
const path = require("path");
const sqlite3 = require("sqlite3").verbose(); //verbose() method allow to have more information in case of a problem

//creating the express server
const app = express();

//server configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false })); // <-- middleware configuration

//connection to the sqlite database
const db_name = path.join(__dirname, "data", "appdata.db");
const db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("successful connection to the database 'appdata.db' ");
});

//starting the server
//port, callback
app.listen(3000, () => {
    console.log("server started (http://localhost:3000/ !");
});

// GET /
///url, callback
// app.get("/", (req, res) => {
//     const sql = "SELECT * FROM Laporan";
//     db.all(sql, [], (err, rows) => {
//         if (err) {
//             return console.error(err.message);
//         }
//         res.render("index", { model: rows });
//     });
// });
//add
app.get('/add', (req, res) =>{
    res.render('add')
});

//POST /add
app.post("/add", (req, res) => {
    const sql = "INSERT INTO Laporan(data_string, data_integer,data_float, data_date, data_boolean) VALUES (?, ?, ?, ?, ?)";
    const data = [
        // req.body.* to access the data posted by the input form
        req.body.string,
        req.body.integer,
        req.body.float,
        req.body.date,
        req.body.boolean,

    ];
    db.run(sql, data, err => {
        //if(err) ...
        if (err) {
            console.error(err.message);
        }
        res.redirect("/")
    });
});

//GET /edit/5
app.get("/edit/:id", (req, res) => {
    //eq.params.* to retrieve the named parameters from the URL (the route)
    const id = req.params.id;
    const sql = "SELECT * FROM laporan WHERE id = ?";
    db.get(sql, id, (err, row) => {
        //if (err) ...
        res.render("edit", { model: row });
    });
});

//POST /edit/5

app.post("/edit/:id", (req, res) =>{
    //req.params.* to retrieve the named parameters from the URL (the route)
    const id = req.params.id;
    const laporan = [
        //req.body to access the data posted by the input form
        req.body.string,
        req.body.integer,
        req.body.float,
        req.body.date,
        req.body.boolean,
        id];
    const sql = "UPDATE Laporan SET data_string=?, data_integer=?, data_float=?, data_date=?, data_boolean=? WHERE (id = ?) ";
    db.run(sql, laporan, err =>{
        if(err){
            console.error(err.message);            
        }
        res.redirect("/");
    });
})

//POST /delete/5

// app.get("/delete/:id", (req, res)=>{
//     //req.params.* to retrieve the named parameters from the URL (the route)
//     const id = req.params.id;
//     const sql = "DELETE FROM Laporan WHERE id = ?";
//     db.run(sql. id, err =>{
//         if(err){
//             console.error(err.message);            
//         }
//         console.log(`data ${id} berhasil dihapus`);
//         res.redirect("/");

        
//     });
    
// });

// delete
app.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    const sqlDel = `DELETE FROM laporan WHERE id = ?`;
    db.run(sqlDel, id, (err) => {
        if (err) throw err;
        console.log('Delete success')
    })
    res.redirect('/');
});


app.get('/', (req, res) => {

    //FILTER

    let arrKondisi = [parseInt(req.query.valueID), req.query.valueString, parseInt(req.query.valueInt), parseFloat(req.query.valueFloat), req.query.valueBool];
    let arrIsChecked = [req.query.isID, req.query.isString, req.query.isInt, req.query.isFloat, req.query.isBool];
    let arrField = ["id = ?","instr(data_string,?)","data_integer = ?","data_float = ?","data_boolean = ?","data_date =?"];

    let activeFilter = [];
    let activeIndex = [];
    for(const key in arrKondisi){
        if (arrIsChecked[key] && arrKondisi[key]){
            activeFilter.push(arrKondisi[key]);
            activeIndex.push(Number(key));
        }
    }

    if(req.query.isDate && req.query.start){
        activeFilter.push(`${req.query.start}`);
        if(req.query.end)
            activeFilter.push(`${req.query.end}`);
        activeIndex.push(5);
    }
    
    //COUNT DATA WITH FILTER
    let sql = "SELECT count(*) FROM laporan";
    let filter = false;
    if(activeFilter.length > 0){
        sql += " WHERE";
        filter = true;
        for(let i = 0; i < activeIndex.length; i++){
            if (activeIndex[i] != 5){
                sql += ` ${arrField[activeIndex[i]]}`;
            } else {
                if(req.query.end)
                    sql += ` ${arrField[activeIndex[i]]} BETWEEN ? AND ?`;
                else
                    sql += ` ${arrField[activeIndex[i]]} >= ?`;
            }
            if(i < activeIndex.length - 1)
                sql += ` AND`;
        }
    }

    const currpage = Number(req.query.page) || 1;
    const limit = 3;
    const lastquery = req.query;
    db.all(sql, activeFilter, (err, count) => {
        const allpage = count[0]['count(*)'];
        const pages = Math.ceil( allpage / limit);
        const offset = (currpage - 1) * limit;

        sql = sql.replace("count(*)","*");
        sql += ` LIMIT ${limit} OFFSET ${offset}`;

        db.all(sql, activeFilter, (err,rows)=>{
            if(err) return err;
            res.render('index',{
                model: rows,
                query: lastquery,
                current: currpage,
                pages: pages,
                url : req.url
            })
        });
    
    });
});

//TODO: CREATE TABLE AND INSERT INTO TABLE IN JAVASCRIPT
const sql_create = `CREATE TABLE IF NOT EXISTS laporan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_string VARCHAR(100) NOT NULL,
    data_integer INTEGER NOT NULL,
    data_float FLOAT NOT NULL,
    data_date text,
    data_boolean BOOLEAN NOT NULL
  );`;
// // TODO: USE db.run()
db.run(sql_create, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'Laporan' table");
});