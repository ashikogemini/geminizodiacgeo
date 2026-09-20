const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვპოულობთ ნებისმიერ მოდელს (gemini-pro, gemini-1.5-flash-latest) და ვცვლით სწორით
code = code.replace(/models\/[^:]+:generateContent/g, 'models/gemini-1.5-flash:generateContent');

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მოდელის სახელი საბოლოოდ გასწორდა ზუსტ gemini-1.5-flash-ზე!');
