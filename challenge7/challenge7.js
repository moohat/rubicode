function weirdMultiply(sentence){
    var keString = sentence.toString()
    var input = 1;
    if(sentence === 0) return 0;
    else if(keString.length === 1){
        return sentence
    }else{

        for (let i = 0; i < keString.length; i++) {
            input *= keString[i];
            
        }
    }
    return weirdMultiply(input);
    


}

console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));
