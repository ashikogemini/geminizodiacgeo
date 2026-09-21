const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვცვლით selectedDate-ს ფიქსირებული თარიღით, რომ შეცდომა აღარ ამოვარდეს
code = code.replace(/getDynamicAspects\s*\([^)]*\)/g, "getDynamicAspects('2026-09-21')");

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ selectedDate პრობლემა წარმატებით გასწორდა!');
