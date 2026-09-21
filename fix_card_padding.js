const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვპოულობთ მოკლევადიანი და გრძელვადიანი ასპექტების კარტებს და ვუმატებთ პატარა პადინგს (მაგ: padding: 12)
code = code.replace(
  /style=\{\[styles\.card,\s*\{\s*marginTop:\s*10\s*\}\]>/g,
  "style={[styles.card, { marginTop: 10, padding: 12 }]>,"
);

code = code.replace(
  /style=\{\[styles\.card,\s*\{\s*marginTop:\s*14\s*\}\]>/g,
  "style={[styles.card, { marginTop: 14, padding: 12 }]>,"
);

// უფრო ზუსტი მიდგომა, თუ სტრუქტურა ოდნავ განსხვავებულია:
code = code.replace(
  /\{?\/\*\s*მოკლევადიანი ასპექტები\s*\*\/\}?\s*<View style=\[styles\.card,\s*\{\s*marginTop:\s*10\s*\}\]\s*\>/g,
  `{/* მოკლევადიანი ასპექტები */}
              <View style={[styles.card, { marginTop: 10, padding: 12 }]}>`
);

code = code.replace(
  /\{?\/\*\s*გრძელვადიანი ასპექტები\s*\*\/\}?\s*<View style=\[styles\.card,\s*\{\s*marginTop:\s*14\s*\}\]\s*\>/g,
  `{/* გრძელვადიანი ასპექტები */}
              <View style={[styles.card, { marginTop: 14, padding: 12 }]}>`
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ასპექტების კარტების პადინგი წარმატებით შეიკუმშა!');
