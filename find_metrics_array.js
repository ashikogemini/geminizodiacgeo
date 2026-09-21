const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

let idx = code.indexOf('ენერგია');
if (idx !== -1) {
  console.log("--- ვიპოვე მეტრიკების ბლოკი App.js-ში ---");
  // ვიღებთ ამ სიტყვის გარშემო არსებულ კოდს
  console.log(code.substring(Math.max(0, idx - 250), idx + 600));
}
