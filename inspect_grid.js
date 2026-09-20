const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
let index = code.indexOf('სიყვარული');
if (index !== -1) {
  console.log("--- კოდის ფრაგმენტი 'სიყვარული'-ს გარშემო ---");
  console.log(code.substring(index - 100, index + 600));
} else {
  console.log("„სიყვარული“ ვერ მოიძებნა App.js-ში. ვნახოთ data.js?");
}
