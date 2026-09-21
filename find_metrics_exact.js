const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვეძებთ სიტყვა "სიყვარული"-ს, რომ ზუსტად მეტრიკების ბლოკს მივაგნოთ
let idx = code.indexOf('სიყვარული');
if (idx !== -1) {
  console.log("--- ვიპოვე მეტრიკების ზუსტი ბლოკი! ---");
  console.log(code.substring(Math.max(0, idx - 300), idx + 800));
} else {
  console.log("ვერ ვიპოვე სიტყვა 'სიყვარული'.");
}
