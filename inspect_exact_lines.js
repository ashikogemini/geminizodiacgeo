const fs = require('fs');
let lines = fs.readFileSync('App.js', 'utf8').split('\n');

for (let i = 1429; i < 1455; i++) {
  if (lines[i]) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
}
