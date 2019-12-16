const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./university.db');
var readlline = require('readline');

var rl = readlline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('username: ', (username) => {
    rl.question('password: ', (password) => {
        db.serialize(() => {
            const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
            var x;
            db.all(sql, [username, password], function (err, data) {
                if(err){
                    next(err);
                    return;
                }
                if(!data){
                    console.log(400);
                    console.log('invalide username or password');                   
                    
                }
                data.forEach((row) =>{
                    if (row.username == username && row.password == password) {
                        x = 1;    
                    }
                    else{
                        x = 2;
                    }
                });
                if(x === 1){
                    console.log('login berhasil');  
                    console.log(`username : ${username} password: ${password} TERSEDIA`);                  
                }
                else{
                    console.log('invalid username or password');                    
                    // console.log(`username : ${username} password: ${password} TIDAK TERSEDIA`);
                }
            });
        })
        // console.log(`username : ${username} password: ${password}` );

    })
});