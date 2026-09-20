const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
let idx = code.indexOf('ტყუპების ვარსკვლავური დღე');
if (idx !== -1) {
  console.log(code.substring(idx - 50, idx + 150));
} else {
  console.log('ვერ მოიძებნა');
}
