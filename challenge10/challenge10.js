var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//manipulasi kata
function stringManipulation(word) {

    if (word.startsWith("a") || word.startsWith("e") || word.startsWith("i") || word.startsWith("o") || word.startsWith("u")) {
      return word;
    } else {
      return word.slice(1) + word.slice(0, 1) + "nyo";
    }
  }
  // manipulasi kalimat with split
  function wordManipulation(str) {
    var toArray = str.split(' ');
  
    for (var x = 0; x < toArray.length; x++) {
      toArray[x] = stringManipulation(toArray[x])
    }
    return toArray.join(' ');
  }

  //calling readline infinitely
var inputReadline = function () {
  rl.question('Tulis kalimatmu disini : ', function (answer) {
      //return closing Rl if answer Good bye!
      
    if (answer == 'Good bye!') //we need some base case, for recursion
      return rl.close(); //closing RL and returning from function.
      var result = wordManipulation(answer);
    console.log(result);   
    inputReadline(); //Calling this function again to ask new question
  });
}

inputReadline(); //we have to actually start our recursion somehow