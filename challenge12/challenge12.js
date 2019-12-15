
if (!process.argv[2]) {
    console.log(`Tolong Sertakan nama file sebagai inputan soalnya\n Misalnya 'node solution.js data.json`);
    //keluar program
    process.exit(1);

}

var readlline = require('readline');
var fs = require('fs');
const FILE_NAME = process.argv[2];
var content = fs.readFileSync(FILE_NAME);
var obj = JSON.parse(content);

var i = 0;
var salah = 1;
var rl = readlline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Jawaban : '
});


// console.log(process.argv[2]);


console.log(`Selamat datang di permainan Tebak-tebakan, kamu akan diberikan pertanyaan dari file ini ${FILE_NAME}. untuk bermain, jawablah dengan jawaban yang sesuai.\n Gunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi. `);

console.log(`\n Pertanyaan: ${obj[i].definition}`);
rl.prompt();
rl.on('line', function (answer) {
    if (answer.toLowerCase() == obj[i].term) {
        console.log('Anda beruntung');
        i++;
        salah = 1;;
        if (i == obj.length) {
            console.log('selamat anda menang');
            process.exit();
            // rl.close();
        }
        console.log("\nPertayaan: " + obj[i].definition);
        rl.prompt();
    }
    else if (answer.toLowerCase() == 'skip') {
        obj.push(obj[i]);
        // console.log(obj[i]);            
        i++;
        console.log("\nPertayaan: " + obj[i].definition);
        rl.prompt();

    }
    else {
        console.log(`anda telah salah ${salah} kali`);
        salah++;
        rl.prompt();

    }
});








