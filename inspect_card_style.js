const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

let idx = code.indexOf('card:');
if (idx !== -1) {
  console.log(code.substring(idx, idx + 150));
}
