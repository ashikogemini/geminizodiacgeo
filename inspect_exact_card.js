const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

let idx = code.indexOf('flash-outline');
if (idx !== -1) {
  console.log("--- მოკლევადიანი ბლოკი ---");
  console.log(code.substring(idx - 150, idx + 250));
}

let idx2 = code.indexOf('planet-outline');
if (idx2 !== -1) {
  console.log("\n--- გრძელვადიანი ბლოკი ---");
  console.log(code.substring(idx2 - 150, idx2 + 250));
}
