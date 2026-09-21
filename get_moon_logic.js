const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
let lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('currentSign') && (lines[i].includes('const ') || lines[i].includes('let '))) {
    for (let j = Math.max(0, i - 5); j < Math.min(lines.length, i + 12); j++) {
      console.log(`${j + 1}: ${lines[j]}`);
    }
    break;
  }
}
