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
    //     head: ['id_kontrak', 'Nama', 'Alamat', 'kontrak']
    //     , colWidths: [40, 30, 20, 10]
    // });

    rl.question('masukan salah satu no. dari opsi diatas: ', (answer) => {
        switch (answer) {
            case "5":
                menukontrak();
                break;

            default:
                break;
        }

        // rl.close();
    });
}


//1. menampilkan menu kontrak
function menukontrak() {
        rl.setPrompt(console.log(`
    ===========================================================
    Silahkan pilih opsi di bawah ini
    [1] daftar kontrak
    [2] cari kontrak
    [3] tambah kontrak
    [4] hapus kontrak
    [5] kembali
    ===========================================================
    `));

    rl.question('masukan salah satu no. dari opsi diatas: ', (answer) => {
        switch (answer) {
            case "1":
                daftarkontrak();
                break;
            case "2":
                carikontrak();
                break;
            case '3':
                tambahkontrak();
                break;
            case '4':
                hapuskontrak();
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

function daftarkontrak() {
    db.serialize(() => {
        const sql = 'SELECT * FROM kontrak';
        db.all(sql, function (err, kontrak) {
            //*looping trough kontrak using forEach becase it is array data

            // if (kontrak) {
            let table = new Table({
                head: ['NIM', 'ID Dosen', 'ID Matkul', 'Nilai' ]
                , colWidths: [10, 10,10,10]
            });
            kontrak.forEach(kontrak => {
                // table is an Array, so you can `push`, `unshift`, `splice` and friends

                table.push(
                    [kontrak.nim, kontrak.id_dosen, kontrak.id_matkul, kontrak.nilai]
                    // ['First value', 'Second value','Third Value','Fourth value','Fifth Value']
                );
            });
            console.log(table.toString());
            menukontrak();
            // }
            // instantiate


        });
    });
}

function carikontrak() {
    console.log('===========================================================');
    rl.question('Masukan NIM: ', (answer) => {
        db.serialize(() => {
            const sql = `SELECT * FROM kontrak WHERE nim = ?`;
            db.get(sql, [answer], function (err, kontrak) {
                if (err) throw err;
                //*looping trough kontrak using forEach becase it is array data                
                if (kontrak) {
                    console.log('===========================================================');
                    console.log(`Detail kontrak`);
                    console.log('===========================================================');
                    console.log(`Nim            :${kontrak.nim} `);
                    console.log(`ID Dosen       :${kontrak.id_dosen} `);
                    console.log(`ID Matkul      :${kontrak.id_matkul} `);
                    console.log(`Nilai          :${kontrak.nilai} `);
                } else {
                    console.log(`kontrak dengan NIM ${answer} tidak terdaftar`);
                }
                // carikontrak();                   
                menukontrak();

            });
        });
    });
}

function tambahkontrak() {
    console.log('===========================================================');
    console.log('Lengkapi data di bawah ini:');
    rl.question('nim: ', (nim) => {
        rl.question('ID Dosen: ', (id_dosen) => {
            rl.question('ID Matkul: ', (id_matkul) =>{
                rl.question('Nilai: ', (nilai) =>{

                    db.serialize(() => {
                        const sql = `INSERT INTO kontrak(nim,id_dosen, id_matkul, nilai) VALUES(?,?,?,?)`;
                        db.run(sql, [nim, id_dosen, id_matkul, nilai], (err) => {
                            if (err) throw err;
                            daftarkontrak();
        
                        });
                    });
                });
            });
        });
    });

}

function hapuskontrak() {
    console.log('===========================================================');
    rl.question(`maskan ID kontrak yang akan dihapus: `, (nim) => {
        db.serialize(() => {
            const checkSql = `SELECT * FROM kontrak WHERE nim = ?`;
            db.get(checkSql, [nim], function (err, kontrak) {
                if (err) throw err;
                if (kontrak) {
            const sql = `DELETE FROM kontrak WHERE nim = ?`;
            db.run(sql, [nim], (err) => {
                if (err) throw err;              

                    console.log(`kontrak dengan nim ${nim} telah dihapus`);                
                daftarkontrak();
            });
        } else{
            console.log(`kontrak ${nim} tidak ditemukan`);
            daftarkontrak();          
        }

        });


    });

});
}


mainMenu();



