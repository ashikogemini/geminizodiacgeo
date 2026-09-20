const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვცვლით მოდელს ოფიციალურ gemini-3.6-flash-ზე
code = code.replace(/models\/[^:]+:generateContent/g, 'models/gemini-3.6-flash:generateContent');

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მოდელი წარმატებით განახლდა gemini-3.6-flash-ზე!');
