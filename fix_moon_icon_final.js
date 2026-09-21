const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვპოულობთ მთვარის ფაზის ბლოკს და ვცვლით flash იკონს chevron-forward-ით
code = code.replace(
  /(მთვარის ფაზა[\s\S]*?)(name="flash"|name="flash-outline")/g,
  '$1name="chevron-forward"'
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მთვარის ფაზის იკონი წარმატებით გასწორდა!');
