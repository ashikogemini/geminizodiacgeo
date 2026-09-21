const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვპოულობთ sparkles იკონს მთვარის პროგნოზის ღილაკში და ვაშორებთ
code = code.replace(
  /<Ionicons name="sparkles" size=\{16\} color="#070913" style=\{\{ marginRight: 6 \}\} \/>\s*/g,
  ''
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ციმციმა იკონი წარმატებით ამოიღო!');
