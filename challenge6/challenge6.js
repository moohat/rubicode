function stringManipulation(word) {

  if (word.startsWith("a") || word.startsWith("e") || word.startsWith("i") || word.startsWith("o") || word.startsWith("u")) {
    return word;
  } else {
    return word.slice(1) + word.slice(0, 1) + "nyo";
  }
}


function wordManipulation(str) {
  var toArray = str.split(' ');

  for (var i = 0; i < toArray.length; i++) {
    toArray[i] = stringManipulation(toArray[i])
  }
  return toArray.join(' ');
}



console.log(wordManipulation("ibu pergi kepasar bersama aku"));