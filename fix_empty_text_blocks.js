const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ამოვშალოთ ცარიელი ტექსტური ბლოკები ასპექტების კარტებიდან
code = code.replace(/<Text style=\{\{\s*color:\s*['"]#d1d5db['"],\s*fontSize:\s*14,\s*lineHeight:\s*18\s*\}\}>\s*<\/Text>/g, '');

// შევამციროთ შიდა სათაურის View-ს marginBottom ზრომდე, რომ კარტა სრულად შეიკუმშოს
code = code.replace(
  /<View style=\{\{\s*flexDirection:\s*'row',\s*alignItems:\s*'center',\s*marginBottom:\s*10\s*\}\}>/g,
  "<View style={{ flexDirection: 'row', alignItems: 'center' }}>"
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ცარიელი ტექსტები და ზედმეტი მარგინები წარმატებით წაიშალა!');
