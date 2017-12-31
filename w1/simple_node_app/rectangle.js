/****************************************
 *  Our node module that we are exporting
*/

/* Without using callbacks


exports.perimeter = (l,b) => 2*(l + b)
exports.area = (l, b) => l*b

*/


// Using node style export
module.exports = (x, y, callback) => {
    if(x <= 0 || y <= 0){
        // simulating a database call error, using delay
        setTimeout(() =>
            callback(new Error("length and width needs to be greater than zero"), 
            null),
            2000);
    }

    else{
        // simulating a successful database call, using delay
        setTimeout(() =>
            callback(null, {
                perimeter: () => (2 * (x + y)),
                area : () => (x*y)
            }),
            2000);
    }
}