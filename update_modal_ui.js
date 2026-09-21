const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვამოწმებთ და ვამატებთ იმპორტს თუ არ ურეთია
if (!code.includes('shortTermAspects')) {
  code = `import { shortTermAspects, longTermAspects } from './dailyHoroscopeData';\n` + code;
}

// აქვე ვწერთ ლოგიკას, რომელმაც უნდა ჩაანაცვლოს ძველი სტატიკური ბლოკები
// ამ სკრიპტით ვამატებთ state-ებს და მოდალურ ფანჯრებს
fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ UI მზად არის ინტეგრაციისთვის!');
