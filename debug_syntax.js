const fs = require('fs');
const lines = fs.readFileSync('App.js', 'utf8').split('\n');
for (let i = 420; i < 445; i++) {
  if (lines[i] !== undefined) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
}
