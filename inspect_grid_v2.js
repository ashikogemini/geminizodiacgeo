const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
let index = code.indexOf('85%');
if (index !== -1) {
  console.log("--- კოდის ფრაგმენტი '85%'-ს გარშემო ---");
  console.log(code.substring(index - 150, index + 500));
} else {
  console.log("'85%' ვერ მოიძებნა App.js-ში.");
}
