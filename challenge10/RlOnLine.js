const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function stringManipulation(word) {

    if (word.startsWith("a") || word.startsWith("e") || word.startsWith("i") || word.startsWith("o") || word.startsWith("u")) {
      return word;
    } else {
      return word.slice(1) + word.slice(0, 1) + "nyo";
    }
  }

  function wordManipulation(str) {
    var toArray = str.split(' ');
    console.log(toArray);
    
  
    for (var x = 0; x < toArray.length; x++) {
      toArray[x] = stringManipulation(toArray[x])
    }
    return toArray.join(' ');
  }
rl.setPrompt('tuliskan kata = ' );
rl.prompt();
// console.log('Tuliskan Kata =');

function kenalan(){
    rl.on('line',(userInput) =>{
        if(userInput == 'Good bye!'){

            console.log('Program ditutup');           
                return rl.close();
        }
        var result = wordManipulation(userInput);
        console.log('output :' + result);
    //    console.log('tuliskan kata :');       
       rl.setPrompt('tuliskan kata :');       
        rl.prompt();       

    });
} 
kenalan()