//array matrix
function array2d(param) {
    let toArray = new Array(param);
    for (let i = 0; i < toArray.length; i++) {
        toArray[i] = new Array(param);
        // console.log(toArray[i]);
        
    }
    let index = 0;

    //loop to initialize 2D array elements.
    for (let i = 0; i < param; i++) {
        for (let j = 0; j < param; j++) {
            toArray[i][j] = index++;
            // console.log(toArray[i][j]);

        }
    }

    // loop to display the elements of 2D array.
    // for (let i = 0; i < param; i++) {
    //     for (let j = 0; j < param; j++) {
    //         toArray[i][j] + " ";
    //     }
        return toArray;
    // }

}

// //matrix Spiral
// function polaSpiral(input) {
//     function spiral(array) {
//         if (array.length == 1) {
//         return array[0];
//       }

//         var firstRow    = array[0]
//         , numRows     = array.length
//         , nextMatrix  = []
//         , newRow
//         , rowIdx
//         , colIdx      = array[1].length - 1

//         for (colIdx; colIdx >= 0; colIdx--) {
//         newRow = [];

//         for (rowIdx = 1; rowIdx < numRows; rowIdx++) {
//           newRow.push(array[rowIdx][colIdx]);
//         }

//         nextMatrix.push(newRow);
//       }

//         firstRow.push.apply(firstRow, spiral(nextMatrix));
//         return firstRow
//     }

//     return spiral(array2d(input));
// }


// console.log(polaSpiral(5))//[ 0,1,2,3,4,9,14,19,24,23,22,21,20,15,10,5,6,7,8,13,18,17,16,11,12 ]
console.log(array2d(5))

