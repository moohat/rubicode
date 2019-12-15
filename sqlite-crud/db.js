const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./university.db');
var Table = require('cli-table');
var readlline = require('readline');

var rl = readlline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// module.exports = db;

console.log(`
===========================================================
Silahkan pilih opsi di bawah ini
[1] Mahasiswa
[2] Jurusan
[3] dosen
[4] mata kuliah
[5] kontrak
[6] keluar
===========================================================
`);
var table = new Table({
    head: ['Nim', 'Nama', 'Alamat', 'Jurusan']
    , colWidths: [40, 30, 20, 10]
});
db.all('SELECT * FROM mahasiswa', function (err, mahasiswa) {    
    
    //*looping trough mahasiswa using forEach becase it is array data
    mahasiswa.forEach(mahasiswa => {
        
        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        table.push(
            [mahasiswa.nim, mahasiswa.nama_mhs, mahasiswa.alamat, mahasiswa.id_jurusan]
            // ['First value', 'Second value','Third Value','Fourth value','Fifth Value']
            );
        });
        // instantiate
        
        console.log(table.toString());   
        
      });