const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

let lines = code.split('\n');
let newLines = lines.filter(line => {
  let trimmed = line.trim();
  // ვფილტრავთ იმ ხაზს, რომელიც შეიცავს "ვიდეო პროგნოზისთვის" ან მსგავს ტექსტს
  return !trimmed.includes('ვიდეო პროგნოზისთვის') && !trimmed.includes('აირჩიეთ პერიოდი');
});

fs.writeFileSync('App.js', newLines.join('\n'), 'utf8');
console.log('✅ ქვეტექსტი წარმატებით წაიშალა!');
