const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
let idx = code.indexOf("label: 'იღბალი'");
if (idx === -1) idx = code.indexOf('იღბალი');
if (idx !== -1) {
  console.log(code.substring(idx - 200, idx + 400));
} else {
  console.log("ვერ მოიძებნა");
}
