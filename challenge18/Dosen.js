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
    //     head: ['id_Dosen', 'Nama', 'Alamat', 'Dosen']
    //     , colWidths: [40, 30, 20, 10]
    // });

    rl.question('masukan salah satu no. dari opsi diatas: ', (answer) => {
        switch (answer) {
            case "3":
                menuDosen();
                break;

            default:
                break;
        }

        // rl.close();
    });
}


//1. menampilkan menu Dosen
function menuDosen() {
        rl.setPrompt(console.log(`
    ===========================================================
    Silahkan pilih opsi di bawah ini
    [1] daftar Dosen
    [2] cari Dosen
    [3] tambah Dosen
    [4] hapus Dosen
    [5] kembali
    ===========================================================
    `));

    rl.question('masukan salah satu no. dari opsi diatas: ', (answer) => {
        switch (answer) {
            case "1":
                daftarDosen();
                break;
            case "2":
                cariDosen();
                break;
            case '3':
                tambahDosen();
                break;
            case '4':
                hapusDosen();
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

function daftarDosen() {
    db.serialize(() => {
        const sql = 'SELECT * FROM dosen';
        db.all(sql, function (err, dosen) {
            //*looping trough Dosen using forEach becase it is array data

            // if (Dosen) {
            let table = new Table({
                head: ['ID Dosen', 'Nama Dosen']
                , colWidths: [10, 30]
            });
            dosen.forEach(dosen => {
                // table is an Array, so you can `push`, `unshift`, `splice` and friends

                table.push(
                    [dosen.id_dosen, dosen.nama_dosen]
                    // ['First value', 'Second value','Third Value','Fourth value','Fifth Value']
                );
            });
            console.log(table.toString());
            menuDosen();
            // }
            // instantiate


        });
    });
}

function cariDosen() {
    console.log('===========================================================');
    rl.question('Masukan ID Dosen: ', (answer) => {
        db.serialize(() => {
            const sql = `SELECT * FROM Dosen WHERE id_Dosen = ?`;
            db.get(sql, [answer], function (err, Dosen) {
                if (err) throw err;
                //*looping trough Dosen using forEach becase it is array data                
                if (Dosen) {
                    console.log('===========================================================');
                    console.log(`Detail Dosen`);
                    console.log('===========================================================');
                    console.log(`id         :${Dosen.id_dosen} `);
                    console.log(`nama       :${Dosen.nama_dosen} `);
                } else {
                    console.log(`Dosen dengan id_Dosen ${answer} tidak terdaftar`);
                }
                // cariDosen();                   
                menuDosen();

            });
        });
    });
}

function tambahDosen() {
    console.log('===========================================================');
    console.log('Lengkapi data di bawah ini:');
    rl.question('id_Dosen: ', (id_Dosen) => {
        rl.question('Nama Dosen: ', (nama_Dosen) => {
            db.serialize(() => {
                const sql = `INSERT INTO Dosen(id_Dosen,nama_Dosen) VALUES(?,?)`;
                db.run(sql, [id_Dosen, nama_Dosen], (err) => {
                    if (err) throw err;
                    daftarDosen();

                });
            });
        });
    });

}

function hapusDosen() {
    console.log('===========================================================');
    rl.question(`maskan ID Dosen yang akan dihapus: `, (id_Dosen) => {
        db.serialize(() => {
            const checkSql = `SELECT * FROM Dosen WHERE id_Dosen = ?`;
            db.get(checkSql, [id_Dosen], function (err, Dosen) {
                if (err) throw err;
                //*looping trough Dosen using forEach becase it is array data                
                if (Dosen) {
            const sql = `DELETE FROM Dosen WHERE id_Dosen = ?`;
            db.run(sql, [id_Dosen], (err) => {
                if (err) throw err;              

                    console.log(`Dosen dengan id_Dosen ${id_Dosen} telah dihapus`);                
                daftarDosen();
            });
        } else{
            console.log(`Dosen ${id_Dosen} tidak ditemukan`);
            daftarDosen();          
        }

        });


    });

});
}


mainMenu();



