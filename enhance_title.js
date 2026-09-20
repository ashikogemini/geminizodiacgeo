const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვეძებთ სათაურის ტექსტს და ვუცვლით სტილს, რომ იყოს უფრო დიდი, მკვეთრი და გამოკვეთილი
code = code.replace(
  /<Text([^>]*>ტყუპების ვარსკვლავური დღე<\/Text>)/g,
  '<Text style={{ color: "#ffd700", fontSize: 20, fontWeight: "bold", letterSpacing: 0.5, marginBottom: 4 }}' + '$1'
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სათაურის სტილი გაუმჯობესდა და გამოიყო!');
