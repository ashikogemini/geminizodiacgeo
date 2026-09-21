const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვეძებთ კონკრეტულ პროცენტს ან სიტყვას, რაც ამ 8 უჯრაშია
let idx = code.indexOf('92%'); 
if (idx === -1) idx = code.indexOf('ინტუიცია');
if (idx === -1) idx = code.indexOf('შემოქმედება');

if (idx !== -1) {
  console.log("--- ვიპოვე 8 უჯრის ბლოკი! ---");
  console.log(code.substring(Math.max(0, idx - 600), idx + 800));
} else {
  console.log("ვერ ვიპოვე მსგავსი უჯრები.");
}
