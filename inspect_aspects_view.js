const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

let idx1 = code.indexOf('მოკლევადიანი ასპექტები');
if (idx1 !== -1) {
  console.log("--- მოკლევადიანი ---");
  console.log(code.substring(idx1 - 60, idx1 + 100));
}

let idx2 = code.indexOf('გრძელვადიანი ასპექტები');
if (idx2 !== -1) {
  console.log("--- გრძელვადიანი ---");
  console.log(code.substring(idx2 - 60, idx2 + 100));
}
