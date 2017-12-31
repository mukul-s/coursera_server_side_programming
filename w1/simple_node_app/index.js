/******************************
 *  Start file for out node app
*/



/** Without using callback and error handling 
 * 
 * 
// importing rectanlge node module
var rect = require('./rectangle')

// To calculate the area and perimeter of a rectangle
function solveReact(l, b){
    console.log("l = "+l, "b = "+b)

    if(l <= 0 || b <= 0){
        console.log("l and b needs to be greater than zero")
    }

    else{
        console.log("perimeter = "+rect.perimeter(l, b))
        console.log("area = "+rect.area(l, b))
        console.log("\n")
    }
}
*/

// Using callbacks and error handling

// importing rectangle node module
var rect = require('./rectangle')

function solveReact(l, b){
    console.log("l = "+l, "b = ", +b);

    // We are using node module to call our callback,
    // Note callback, always returns an erorr and function, and takes an error and funciton as parameters
    rect(l, b, (err, rectangle)=> {
        if(err){
            console.log("Error:",err.message);
        }
        else{
            console.log("perimeter:"+ rectangle.perimeter(), "area:"+ rectangle.area());
        }
    });

    // This is after call to react, but this will execute before our rect() function finishes,
    // because of async calls
    console.log("After rect call")
};

// Some examples
solveReact(5, 6)
solveReact(-2, 3)