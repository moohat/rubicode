/*
 * challange #3 
 * @param {*} n 
 */


function KonversiRomawi(n){
    // index ke    0    1     2   3     4    5    6     7     8    9    10    11   12
    var romawi = ["M", "CM", "D","CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    // var romawi = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
                //  0     1    2  3    4    5    6    7   8  9  10  11 12
    var desimal = [1000, 900, 500,400, 100, 90,   50, 40, 10, 9, 5, 4, 1];
    // var desimal = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];

    var hasil ="";
    for(let i=0; i< desimal.length; i++){
        while(desimal[i] <= n){
            hasil += romawi[i];
            n -= desimal[i];
        }
    }
    return hasil;

}
console.log("Script Testing untuk Konversi Romawi\n");
console.log("input | expected | result");
console.log("______|__________|_______");
console.log("4     | IV       | ",KonversiRomawi(4));
console.log("9     | IX       | ",KonversiRomawi(9));
console.log("13    | XIII     | ",KonversiRomawi(13));
console.log("1453  | MCDLIII  | ",KonversiRomawi(1453));
console.log("1646  | MDCXLVI  | ",KonversiRomawi(1646));





// console.log(KonversiRomawi(1646));