const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const target = '<Text style={styles.cardTitle}>✨ ტყუპების ვარსკვლავური დღე</Text>';
const replacement = '<Text style={[styles.cardTitle, { color: "#ffd700", fontSize: 19, fontWeight: "bold" }]}>✨ ტყუპების ვარსკვლავური დღე</Text>';

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ სათაურის სტილი წარმატებით გამოიყო!');
} else {
  // ალტერნატიული რეგლამენტით ძებნა
  code = code.replace(/<Text\s+style=\{styles\.cardTitle\}>[^<]*<\/Text>/g, replacement);
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ სათაური განახლდა ალტერნატიული მეთოდით!');
}
