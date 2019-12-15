const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./university.db');
var Table = require('cli-table');
var readlline = require('readline');

var rl = readlline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// module.exports = db;
function mainMenu() {

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
    // var table = new Table({
    //     head: ['id_jurusan', 'Nama', 'Alamat', 'Jurusan']
    //     , colWidths: [40, 30, 20, 10]
    // });

    rl.question('masukan salah satu no. dari opsi diatas: ', (answer) => {
        switch (answer) {
            case "2":
                menuJurusan();
                break;

            default:
                break;
        }

        // rl.close();
    });
}


//1. menampilkan menu Jurusan
function menuJurusan() {
        rl.setPrompt(console.log(`
    ===========================================================
    Silahkan pilih opsi di bawah ini
    [1] daftar Jurusan
    [2] cari Jurusan
    [3] tambah Jurusan
    [4] hapus Jurusan
    [5] kembali
    ===========================================================
    `));

    rl.question('masukan salah satu no. dari opsi diatas: ', (answer) => {
        switch (answer) {
            case "1":
                daftarJurusan();
                break;
            case "2":
                cariJurusan();
                break;
            case '3':
                tambahJurusan();
                break;
            case '4':
                hapusJurusan();
                break;
            case '5':
                mainMenu();
                break;

            default:
                break;
        }

        // rl.close();
    });

}

function daftarJurusan() {
    db.serialize(() => {
        const sql = 'SELECT * FROM jurusan';
        db.all(sql, function (err, jurusan) {
            //*looping trough Jurusan using forEach becase it is array data

            // if (Jurusan) {
            let table = new Table({
                head: ['ID Jurusan', 'Nama Jurusan']
                , colWidths: [10, 30]
            });
            jurusan.forEach(jurusan => {
                // table is an Array, so you can `push`, `unshift`, `splice` and friends

                table.push(
                    [jurusan.id_jurusan, jurusan.nama_jurusan]
                    // ['First value', 'Second value','Third Value','Fourth value','Fifth Value']
                );
            });
            console.log(table.toString());
            menuJurusan();
            // }
            // instantiate


        });
    });
}

function cariJurusan() {
    console.log('===========================================================');
    rl.question('Masukan ID Jurusan: ', (answer) => {
        db.serialize(() => {
            const sql = `SELECT * FROM jurusan WHERE id_jurusan = ?`;
            db.get(sql, [answer], function (err, jurusan) {
                if (err) throw err;
                //*looping trough Jurusan using forEach becase it is array data                
                if (jurusan) {
                    console.log('===========================================================');
                    console.log(`Detail Jurusan`);
                    console.log('===========================================================');
                    console.log(`id         :${jurusan.id_jurusan} `);
                    console.log(`nama       :${jurusan.nama_jurusan} `);
                } else {
                    console.log(`Jurusan dengan id_jurusan ${answer} tidak terdaftar`);
                }
                // cariJurusan();                   
                menuJurusan();

            });
        });
    });
}

function tambahJurusan() {
    console.log('===========================================================');
    console.log('Lengkapi data di bawah ini:');
    rl.question('id_jurusan: ', (id_jurusan) => {
        rl.question('Nama Jurusan: ', (nama_jurusan) => {
            db.serialize(() => {
                const sql = `INSERT INTO Jurusan(id_jurusan,nama_jurusan) VALUES(?,?)`;
                db.run(sql, [id_jurusan, nama_jurusan], (err) => {
                    if (err) throw err;
                    daftarJurusan();

                });
            });
        });
    });

}

function hapusJurusan() {
    console.log('===========================================================');
    rl.question(`maskan ID Jurusan yang akan dihapus: `, (id_jurusan) => {
        db.serialize(() => {
            const checkSql = `SELECT * FROM jurusan WHERE id_jurusan = ?`;
            db.get(checkSql, [id_jurusan], function (err, jurusan) {
                if (err) throw err;
                //*looping trough Jurusan using forEach becase it is array data                
                if (jurusan) {
            const sql = `DELETE FROM Jurusan WHERE id_jurusan = ?`;
            db.run(sql, [id_jurusan], (err) => {
                if (err) throw err;              

                    console.log(`Jurusan dengan id_jurusan ${id_jurusan} telah dihapus`);                
                daftarJurusan();
            });
        } else{
            console.log(`Jurusan ${id_jurusan} tidak ditemukan`);
            daftarJurusan();          
        }

        });


    });

});
}


mainMenu();



