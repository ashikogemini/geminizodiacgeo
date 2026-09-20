const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
code = code.replace(/gemini-1.5-flash-latest:generateContent/g, 'gemini-pro:generateContent');
fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მოდელი წარმატებით შეიცვალა სტაბილურ gemini-pro-ზე!');
