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
    [3] Dosen
    [4] mata kuliah
    [5] kontrak
    [6] keluar
    ===========================================================
    `);
    // var table = new Table({
    //     head: ['id_matkul', 'Nama', 'Alamat', 'mata_kuliah']
    //     , colWidths: [40, 30, 20, 10]
    // });

    rl.question('masukan salah satu no. dari opsi diatas: ', (answer) => {
        switch (answer) {
            case "4":
                menuMataKuliah();
                break;

            default:
                break;
        }

        // rl.close();
    });
}


//1. menampilkan menu mata_kuliah
function menuMataKuliah() {
        rl.setPrompt(console.log(`
    ===========================================================
    Silahkan pilih opsi di bawah ini
    [1] daftar mata kuliah
    [2] cari mata kuliah
    [3] tambah mata kuliah
    [4] hapus mata kuliah
    [5] kembali
    ===========================================================
    `));

    rl.question('masukan salah satu no. dari opsi diatas: ', (answer) => {
        switch (answer) {
            case "1":
                daftarMataKuliah();
                break;
            case "2":
                cariMataKuliah();
                break;
            case '3':
                tambahMataKuliah();
                break;
            case '4':
                hapusMataKuliah();
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

function daftarMataKuliah() {
    db.serialize(() => {
        const sql = 'SELECT * FROM mata_kuliah';
        db.all(sql, function (err, mata_kuliah) {
            //*looping trough mata_kuliah using forEach becase it is array data

            // if (mata_kuliah) {
            let table = new Table({
                head: ['ID mata_kuliah', 'Nama mata_kuliah']
                , colWidths: [10, 30]
            });
            mata_kuliah.forEach(mata_kuliah => {
                // table is an Array, so you can `push`, `unshift`, `splice` and friends

                table.push(
                    [mata_kuliah.id_matkul, mata_kuliah.nama_matkul]
                    // ['First value', 'Second value','Third Value','Fourth value','Fifth Value']
                );
            });
            console.log(table.toString());
            menuMataKuliah();
            // }
            // instantiate


        });
    });
}

function cariMataKuliah() {
    console.log('===========================================================');
    rl.question('Masukan ID mata_kuliah: ', (answer) => {
        db.serialize(() => {
            const sql = `SELECT * FROM mata_kuliah WHERE id_matkul = ?`;
            db.get(sql, [answer], function (err, mata_kuliah) {
                if (err) throw err;
                //*looping trough mata_kuliah using forEach becase it is array data                
                if (mata_kuliah) {
                    console.log('===========================================================');
                    console.log(`Detail mata_kuliah`);
                    console.log('===========================================================');
                    console.log(`id         :${mata_kuliah.id_matkul} `);
                    console.log(`nama       :${mata_kuliah.nama_matkul} `);
                } else {
                    console.log(`mata_kuliah dengan id_matkul ${answer} tidak terdaftar`);
                }
                // cariMataKuliah();                   
                menuMataKuliah();

            });
        });
    });
}

function tambahMataKuliah() {
    console.log('===========================================================');
    console.log('Lengkapi data di bawah ini:');
    rl.question('id_matkul: ', (id_matkul) => {
        rl.question('Nama mata_kuliah: ', (nama_matkul) => {
            db.serialize(() => {
                const sql = `INSERT INTO mata_kuliah(id_matkul,nama_matkul) VALUES(?,?)`;
                db.run(sql, [id_matkul, nama_matkul], (err) => {
                    if (err) throw err;
                    daftarMataKuliah();

                });
            });
        });
    });

}

function hapusMataKuliah() {
    console.log('===========================================================');
    rl.question(`maskan ID mata_kuliah yang akan dihapus: `, (id_matkul) => {
        db.serialize(() => {
            const checkSql = `SELECT * FROM mata_kuliah WHERE id_matkul = ?`;
            db.get(checkSql, [id_matkul], function (err, mata_kuliah) {
                if (err) throw err;
                //*looping trough mata_kuliah using forEach becase it is array data                
                if (mata_kuliah) {
            const sql = `DELETE FROM mata_kuliah WHERE id_matkul = ?`;
            db.run(sql, [id_matkul], (err) => {
                if (err) throw err;              

                    console.log(`mata_kuliah dengan id_matkul ${id_matkul} telah dihapus`);                
                daftarMataKuliah();
            });
        } else{
            console.log(`mata_kuliah ${id_matkul} tidak ditemukan`);
            daftarMataKuliah();          
        }

        });


    });

});
}


mainMenu();



