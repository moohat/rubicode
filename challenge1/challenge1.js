function sum(){
    let input = 0;
    // let i = 0;
    // while (i<arguments.length) {
    //     val += arguments[i];
    //     i++;
    // }
    // do {
    //     val += arguments[i];
    //     i++
    // } while (i<arguments.length);
    for(let i =0; i<arguments.length; i++){
        input += arguments[i];
    }
    console.log(input);
      
    
}

sum(1,2,7);
sum(1,4);
sum(11);
sum(10,3,6,7,9);