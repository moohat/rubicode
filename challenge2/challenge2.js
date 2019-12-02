/*
 * 
 * Challange #2 
 */

function deretKaskus(n){
    let jumlah = [];
    for(let i = 3; i<=n*3; i+=3){          
       
        if(i % 5 ===0 && i %6 ===0){
            jumlah.push("kaskus");
        }else if( i % 6 === 0){
            jumlah.push("kus")
        }else if( i % 5 ===0 ){
            jumlah.push("kas")
        } else{
            jumlah.push(i);
        }  
   }
   
   return jumlah;
}
console.log(deretKaskus(10));
// console.log(10);
