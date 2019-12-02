// //Challenge#5

// function stringManipulation(word){
//     
//     var vowelRegex = '^[aieouAIEOU].*';
//     var matched = word.match(vowelRegex);
//     if(word.startsWith(matched)){
//         return word;
//     }else{
//         // return word.slice(1);
//         // return word.slice(0,1);

//      return word.slice(1)+word.slice(0,1)+"nyo";
//     //   return 'bukan awalan fokal'
//     }
// }

// console.log(stringManipulation("itik"));
// console.log(stringManipulation("cecak"));

function stringManipulation(word){
    
    if(word.startsWith("a") || word.startsWith("e") || word.startsWith("i") || word.startsWith("o") ||word.startsWith("u") ){
        return word;
    }else{
        // return word.slice(1);
        // return word.slice(0,1);

        // ecak          + c             + nyo
     return word.slice(1)+word.slice(0,1)+"nyo";
    //   return 'bukan awalan fokal'
    }
}

console.log(stringManipulation("cecak"));
console.log(stringManipulation("bebek"));

