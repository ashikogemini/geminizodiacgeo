const fs = require('fs');
if (fs.existsSync('DailyHoroscopeCard.js')) {
  let code = fs.readFileSync('DailyHoroscopeCard.js', 'utf8');
  let lines = code.split('\n');
  for (let i = 0; i < Math.min(20, lines.length); i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
} else {
  console.log("ფაილი არ მოიძებნა.");
}
