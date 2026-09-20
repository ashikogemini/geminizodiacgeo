const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვცვლით მოდელს თანამედროვე gemini-2.5-flash-ზე
code = code.replace(/models\/[^:]+:generateContent/g, 'models/gemini-2.5-flash:generateContent');

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მოდელი წარმატებით შეიცვალა gemini-2.5-flash-ზე!');
