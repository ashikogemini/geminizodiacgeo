const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვცვლით chevron-forward იკონს flash-ით მოკლევადიანი ასპექტების ხაზზე
code = code.replace(
  /<View style=\{\{ flexDirection: 'row', alignItems: 'center' \}\}>\s*<Ionicons name="chevron-forward" size=\{22\} color="#d4af37" style=\{\{ marginRight: 8 \}\} \/>\s*<Text style=\{\{ color: '#fff', fontSize: 16, fontWeight: 'bold' \}\}>მოკლევადიანი ასპექტები<\/Text>/,
  `<View style={{ flexDirection: 'row', alignItems: 'center' }}>\n                    <Ionicons name="flash" size={22} color="#d4af37" style={{ marginRight: 8 }} />\n                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>მოკლევადიანი ასპექტები</Text>`
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მოკლევადიანი ასპექტების იკონი წარმატებით შეიცვალა!');
