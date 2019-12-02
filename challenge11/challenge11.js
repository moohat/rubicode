var readline = require('readline');

var fs = require('fs');
var content = fs.readFileSync('nodejs/data.json');
var obj = JSON.parse(content);

var i = 0;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tebakan > '
});

function tebakKata() {
    console.log('Selamat datang di permainan tebak kata, silahkan isi dengan jawaban yang benar ya! ');
    console.log(`\nPertanyaan: ${obj[i].definition}`);
    rl.prompt();
    rl.on('line', function (answer) {
        if (answer.toLowerCase() == obj[i].term) {
            console.log('Jawaban anda benar')
            i++;

            if (i == obj.length) {
                console.log('selamat anda menang');
                process.exit();
            }
            console.log("\nPertayaan: " + obj[i].definition);
            rl.prompt();
        }
        else {
            console.log('Wkwkwkwk anda kurang beruntung');
            rl.prompt();
        }
    });

}



rl.on('SIGINT', () => {
    rl.close();
    console.log('Program ditutup');
    process.exit();
})



// console.log(content[0]);



tebakKata()