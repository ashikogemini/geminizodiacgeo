const fs = require('fs');
if (fs.existsSync('DailyHoroscopeCard.js')) {
  let code = fs.readFileSync('DailyHoroscopeCard.js', 'utf8');
  let idx = code.indexOf('80%');
  if (idx === -1) idx = code.indexOf('ენერგია');
  
  if (idx !== -1) {
    console.log("--- ვიპოვე მეტრიკები DailyHoroscopeCard.js-ში! ---");
    console.log(code.substring(Math.max(0, idx - 400), idx + 600));
  } else {
    console.log("აქაც არ არის გაწერილი პროცენტები.");
  }
} else {
  console.log("DailyHoroscopeCard.js არ მოიძებნა.");
}
