const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
let lines = code.split('\n');
for (let i = 434; i < Math.min(lines.length, 510); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
