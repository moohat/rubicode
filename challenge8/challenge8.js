function pola(str){
    let toArray = str.split(' ');
    let tampung =[];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {           
            // console.log('i '+i,'j '+j);
            if((toArray[0].replace('#',i))* toArray[2] == toArray[4].replace('#',j)){
                tampung.push(i,j)
                // return (toArray[0].replace('#',i))* toArray[2] +' = ' +toArray[4].replace('#',j)
            }
        }        
    }
    return tampung
}
console.log(pola('42#3 * 188 = 80#204'));
console.log(pola('8#61 * 895 = 78410#5'));
