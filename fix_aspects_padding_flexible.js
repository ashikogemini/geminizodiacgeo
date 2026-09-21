const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// Flexible replacement for მოკლევადიანი ასპექტები card view
code = code.replace(
  /<View\s+style=\{\[styles\.card,\s*\{\s*marginTop:\s*10\s*\}\]\}\s*>/g,
  '<View style={[styles.card, { marginTop: 10, padding: 12 }]}>'
);

// Flexible replacement for გრძელვადიანი ასპექტები card view
code = code.replace(
  /<View\s+style=\{\[styles\.card,\s*\{\s*marginTop:\s*14\s*\}\]\}\s*>/g,
  '<View style={[styles.card, { marginTop: 14, padding: 12 }]}>'
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ასპექტების კარტების პადინგი წარმატებით განახლდა მოქნილი მეთოდით!');
