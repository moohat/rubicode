const db    = require('./db');
var Table = require('cli-table');
var readlline = require('readline');

var rl = readlline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//1. menampilkan menu mahasiswa
function menuMahasiswa() {
console.log(`
===========================================================
Silahkan pilih opsi di bawah ini
[1] daftar murid
[2] cari murid
[3] tambah murid
[4] hapus murid
[5] kembali
===========================================================
`);

    rl.question('masukan salah satu no. dari opsi diatas: ', (answer) => {
        switch (answer) {
            case "1":
                daftarMurid();
                break;
            case "2":
                cariMurid();
                break;
            case '3':
                tambahMurid();
                break;
            case '4':
                hapusMurid();
                break;
            case '5':
                mainMenu();
                break;

            default:
                break;
        }

    });

}

function daftarMurid() {
    db.serialize(() => {
        const sql = 'SELECT * FROM mahasiswa';
        db.all(sql, function (err, mahasiswa) {

            // if (mahasiswa) {
            let table = new Table({
                head: ['Nim', 'Nama', 'Alamat', 'Jurusan']
                , colWidths: [10, 30, 20, 10]
            });
            //*looping trough mahasiswa using forEach because it is array data
            mahasiswa.forEach(mahasiswa => {
                // table is an Array, so you can `push`, `unshift`, `splice` and friends

                table.push(
                    [mahasiswa.nim, mahasiswa.nama_mhs, mahasiswa.alamat, mahasiswa.id_jurusan]
                    // ['First value', 'Second value','Third Value','Fourth value','Fifth Value']
                );
            });
            console.log(table.toString());
            menuMahasiswa();

        });
    });
}

function cariMurid() {
    console.log('===========================================================');
    rl.question('Masukan NIM: ', (answer) => {
        db.serialize(() => {
            const sql = `SELECT * FROM mahasiswa WHERE nim = ?`;
            db.get(sql, [answer], function (err, mahasiswa) {
                if (err) throw err;
                if (mahasiswa) {
                    console.log('===========================================================');
                    console.log(`Student details`);
                    console.log('===========================================================');
                    console.log(`id         :${mahasiswa.nim} `);
                    console.log(`nama       :${mahasiswa.nama_mhs} `);
                    console.log(`alamat     :${mahasiswa.alamat} `);
                    console.log(`jurusan    :${mahasiswa.id_jurusan} `);
                    menuMahasiswa();
                } else {
                    console.log(`mahasiswa dengan nim ${answer} tidak terdaftar`);
                    // rl.prompt();
                    cariMurid();
                }
                // cariMurid();                   

            });
        });
    });
}

function tambahMurid() {
    console.log('===========================================================');
    console.log('Lengkapi data di bawah ini:');
    rl.question('NIM: ', (nim) => {
        rl.question('Nama: ', (nama_mhs) => {
            rl.question('alamat:', (alamat) => {
                rl.question('jurusan:', (id_jurusan) => {
                    rl.question('umur:', (umur) => {
                        db.serialize(() => {
                            const sql = `INSERT INTO mahasiswa(nim,nama_mhs,alamat,id_jurusan,umur) VALUES(?,?,?,?,?)`;
                            //insert into database using db.run
                            /** using query binding ===> */
                            db.run(sql, [nim, nama_mhs, alamat, id_jurusan, umur], (err) => {
                                if (err) throw err;
                                daftarMurid();

                            });
                        });
                    });
                });
            });
        });
    });
}

function hapusMurid() {
    console.log('===========================================================');
    rl.question(`masukan NIM mahasiswa yang akan dihapus: `, (nim) => {
        db.serialize(() => {


            const sql = `DELETE FROM mahasiswa WHERE nim = ?`;
            db.run(sql, [nim], (err) => {
                if (err) throw err;


                console.log(`mahasiswa dengan nim ${nim} telah dihapus`);
                daftarMurid();
            });

        });
    });
}

menuMahasiswa();

