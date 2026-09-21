const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
let lines = code.split('\n');

console.log("--- ხაზები 1435-დან 1455-მდე ---");
for (let i = 1434; i < Math.min(lines.length, 1455); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
