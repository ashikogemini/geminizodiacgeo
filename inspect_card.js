const fs = require('fs');
let code = fs.readFileSync('DailyHoroscopeCard.js', 'utf8');
let lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('სიყვარული') || lines[i].includes('isExpanded')) {
    for (let j = Math.max(0, i - 5); j < Math.min(lines.length, i + 35); j++) {
      console.log(`${j + 1}: ${lines[j]}`);
    }
    break;
  }
}
