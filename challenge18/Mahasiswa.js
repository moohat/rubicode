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
    //     head: ['Nim', 'Nama', 'Alamat', 'Jurusan']
    //     , colWidths: [40, 30, 20, 10]
    // });

    rl.question('masukan salah satu no. dari opsi diatas: ', (answer) => {
        switch (answer) {
            case "1":
                menuMahasiswa();
                break;
            case "2":
                menuJurusan();
                break;
            case "3":
                menuDosen();
                break;
            case "4":
                menuMataKuliah();
                break;
            case "5":
                menukontrak();
                break;
            case "6":
                console.log(`Anda keluar program`);                
                // rl.close();
                login();
                break;
            default:
                break;
        }

        // rl.close();
    });
}


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
                    cariMurid();
                }

            });
        });
    });
}

// function cariMurid() {
//     console.log('===========================================================');
//     rl.setPrompt('Masukan NIM: ');
//     rl.prompt();
//     rl.on('line',(answer) =>{
//         db.serialize(() => {
//             const sql = `SELECT * FROM mahasiswa WHERE nim = ?`;
//             db.get(sql, [answer], function (err, mahasiswa) {
//                 if (err) throw err;
//                 if (mahasiswa) {
//                     console.log('===========================================================');
//                     console.log(`Student details`);
//                     console.log('===========================================================');
//                     console.log(`id         :${mahasiswa.nim} `);
//                     console.log(`nama       :${mahasiswa.nama_mhs} `);
//                     console.log(`alamat     :${mahasiswa.alamat} `);
//                     console.log(`jurusan    :${mahasiswa.id_jurusan} `);
//                     // menuMahasiswa();

//                 } else {
//                     // console.log(`mahasiswa dengan nim ${answer} tidak terdaftar`);
//                     rl.setPrompt(`mahasiswa dengan nim ${answer} tidak terdaftar \nMasukan NIM: `);
//                     rl.prompt();
//                 }
//                 // cariMurid();                   
//                 menuMahasiswa();

//             });
//         });
//     });
// }

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




/**
 *TODO:  DAFTAR MENU JURUSAN
 */
//1. menampilkan menu Jurusan
function menuJurusan() {
console.log(`
===========================================================
Silahkan pilih opsi di bawah ini
[1] daftar Jurusan
[2] cari Jurusan
[3] tambah Jurusan
[4] hapus Jurusan
[5] kembali
===========================================================
`);

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
                    menuJurusan();

                } else {
                    console.log(`Jurusan dengan ID Jurusan ${answer} tidak terdaftar`);
                    cariJurusan();
                }
                // cariJurusan();                   

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
                } else {
                    console.log(`Jurusan ${id_jurusan} tidak ditemukan`);
                    daftarJurusan();
                }

            });


        });

    });
}

/**
 *TODO:  DAFTAR MENU DOSEN
 */
//1. menampilkan menu Dosen
function menuDosen() {
console.log(`
===========================================================
Silahkan pilih opsi di bawah ini
[1] daftar Dosen
[2] cari Dosen
[3] tambah Dosen
[4] hapus Dosen
[5] kembali
===========================================================
`);

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
                    menuDosen();

                } else {
                    console.log(`Dosen dengan id_Dosen ${answer} tidak terdaftar`);
                    cariDosen();                   
                }

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
                } else {
                    console.log(`Dosen ${id_Dosen} tidak ditemukan`);
                    daftarDosen();
                }

            });


        });

    });
}

/**
 *TODO: Daftar Menu Mata Kuliah
 */
//1. menampilkan menu mata_kuliah
function menuMataKuliah() {
console.log(`
===========================================================
Silahkan pilih opsi di bawah ini
[1] daftar mata kuliah
[2] cari mata kuliah
[3] tambah mata kuliah
[4] hapus mata kuliah
[5] kembali
===========================================================
`);

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
                    menuMataKuliah();
                } else {
                    console.log(`mata_kuliah dengan id_matkul ${answer} tidak terdaftar`);
                    cariMataKuliah();                   
                }

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
                } else {
                    console.log(`mata_kuliah ${id_matkul} tidak ditemukan`);
                    daftarMataKuliah();
                }

            });


        });

    });
}

/** 
 * TODO: MENU KONTRAK 
 */
//5. menampilkan menu kontrak
function menukontrak() {
console.log(`
===========================================================
Silahkan pilih opsi di bawah ini
[1] daftar kontrak
[2] cari kontrak
[3] tambah kontrak
[4] hapus kontrak
[5] kembali
===========================================================
`);

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
                head: ['NIM', 'ID Dosen', 'ID Matkul', 'Nilai']
                , colWidths: [10, 10, 10, 10]
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
                    menukontrak();
                } else {
                    console.log(`kontrak dengan NIM ${answer} tidak terdaftar`);
                    carikontrak();                   
                }

            });
        });
    });
}

function tambahkontrak() {
    console.log('===========================================================');
    console.log('Lengkapi data di bawah ini:');
    rl.question('nim: ', (nim) => {
        rl.question('ID Dosen: ', (id_dosen) => {
            rl.question('ID Matkul: ', (id_matkul) => {
                rl.question('Nilai: ', (nilai) => {

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
                } else {
                    console.log(`kontrak ${nim} tidak ditemukan`);
                    daftarkontrak();
                }
            });
        });

    });
}

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


