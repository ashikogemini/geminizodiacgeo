const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

let idx = code.indexOf('მოკლევადიანი ასპექტები');
if (idx !== -1) {
  console.log(code.substring(idx - 20, idx + 400));
}
