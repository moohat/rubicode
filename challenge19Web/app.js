const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const writeData = (data) => fs.writeFileSync('./data.json', JSON.stringify(data, null, 3));
const app = express();

//parse application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))

//parse application/json

//set view file
app.set('views', path.join(__dirname, 'views'))
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());

// app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) =>{
    res.render('index', {data:data});
});

app.get('/add', (req, res) =>{
    res.render('add')
});

app.post('/add', (req, res) =>{
        data.push({
            id:req.body.id,
            string: req.body.string,
            integer: req.body.integer,
            float: req.body.float,
            date: req.body.date,
            boolean: req.body.boolean
        });
        writeData(data);
        res.redirect('/');
});




app.get('/edit', (req, res) =>{
    res.render('edit')
});

app.listen(3000, () => {
    console.log(`web ini berjalan di port 3000!`)
});