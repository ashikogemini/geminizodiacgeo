const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

let idx = code.indexOf('მოკლევადიანი ასპექტები');
if (idx !== -1) {
  console.log("--- მოკლევადიანი ასპექტების ბლოკი ---");
  console.log(code.substring(idx - 250, idx + 200));
} else {
  console.log("ვერ მოიძებნა.");
}
