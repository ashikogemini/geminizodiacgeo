const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
let idx = code.indexOf('ტყუპების ვარსკვლავური დღე');
if (idx === -1) idx = code.indexOf('ტყუპები დღეს');
if (idx !== -1) {
  console.log("--- სათაურის კონტექსტი ---");
  console.log(code.substring(idx - 100, idx + 200));
} else {
  console.log("სათაური ვერ მოიძებნა ზუსტი ტექსტით.");
}
