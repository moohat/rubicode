function indexPrime(param){
    var bilPrima = [];
    var i =2;
    //iterasi panjang bilangan prima
    for(bilPrima.length=0; bilPrima.length< param; i++){
        // console.log(bilPrima.push(i));
        var isPrime = true; 
        for(var j=0; j<=bilPrima.length; j++){
            //mengecek apakah bilangan prima
            var prime = bilPrima[j];
            if( i % prime === 0){
                isPrime=false;
                break;
            }
            if(prime*prime > i)
                break;
         }
        if(isPrime)
            bilPrima.push(i);
    }
return bilPrima.pop();
}
console.log(indexPrime(4));
// console.log(indexPrime(500));
// console.log(indexPrime(37786));