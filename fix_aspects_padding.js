const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// შევცვალოთ მოკლევადიანი და გრძელვადიანი ასპექტების კარტების სტილი, რომ უფრო კომპაქტური გახდეს
// ვპოულობთ მათ სტილებს და ვამცირებთ padding-ს და მარგინებს

code = code.replace(
  /(\{?\/\*\s*მოკლევადიანი ასპექტები\s*\*\/\}?\s*<View style=\[styles\.card,\s*\{\s*marginTop:\s*\d+\s*\}\]\s*\>)/g,
  `$1\n                <TouchableOpacity activeOpacity={0.7} style={{ paddingVertical: 4 }}>`
);

// უფრო ზუსტად, შევცვალოთ ამ ბლოკების კონტეინერების padding/margin სტილები
code = code.replace(
  /(<Text style=\{\{\s*color:\s*['"]#fff['"],\s*fontSize:\s*16,\s*fontWeight:\s*'bold'\s*\}\}>მოკლევადიანი ასპექტები<\/Text>[\s\S]*?<\/View>)/g,
  `$1`
);

// მოდი, მარტივად ვპოულობთ და ვამცირებთ ამ ორ ბლოკზე სტილებს
code = code.replace(/marginTop:\s*10\s*\}\]>/g, "marginTop: 8, paddingVertical: 2 }]}>");
code = code.replace(/marginTop:\s*14\s*\}\]>/g, "marginTop: 8, paddingVertical: 2 }]}>");

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ასპექტების ბლოკების ზომები და პადინგები შეიკუმშა!');
