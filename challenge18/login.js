const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./university.db');
var readlline = require('readline');

var rl = readlline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * TODO: LOGIN USER
 */
function login() {
    console.log('===========================================================');
    console.log(`Welcome to Program Keren`);
    console.log('===========================================================');
    rl.question('username: ', (username) => {
        rl.question('password: ', (password) => {
            db.serialize(() => {
                const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
                var x;
                db.all(sql, [username, password], function (err, data) {                                     
                    if (err) throw err;                    
                    data.forEach((row) => {
                        if (row.username == username && row.password == password) {
                            // console.log(`ini adalah ${row.hak_akses}`);
                            console.log(`Welcome, ${username} Your access level is:  ${row.hak_akses.toUpperCase()}`);                            
                            x = 1;
                        }
                        else {
                            x = 2;
                        }
                    });
                    if (x === 1) {                      
                        
                        mainMenu();
                    }
                    else {
                        console.log('invalid username or password');
                        login();                        
                    }
                });
            });
           
        });
    });
}
// mainMenu();

login();