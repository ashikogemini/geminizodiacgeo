const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
code = code.replace(/gemini-1.5-flash:generateContent/g, 'gemini-1.5-flash-latest:generateContent');
fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მოდელის სახელი წარმატებით განახლდა');
