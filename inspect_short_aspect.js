const fs = require('fs');
let lines = fs.readFileSync('App.js', 'utf8').split('\n');
for (let i = 1485; i < 1525; i++) {
  if (lines[i] !== undefined) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
}
