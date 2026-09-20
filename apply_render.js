const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვეძებთ ზუსტად იმ ხაზს, სადაც ჰოროსკოპის ტექსტი იხატება (style={[styles.bodyText, { marginTop: 8 }])
const regex = /<Text\s+style=\{\[styles\.bodyText,\s*\{\s*marginTop:\s*8\s*\}\]\}>([^<]+)<\/Text>/;
const match = code.match(regex);

if (match) {
  const fullMatch = match[0];
  const variableInside = match[1].trim(); // მაგალითად {horoscope} ან მსგავსი
  const cleanVar = variableInside.replace(/[{}]/g, '');
  
  const replacement = `{renderFormattedHoroscope(${cleanVar})}`;
  code = code.replace(fullMatch, replacement);
  
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ ჰოროსკოპის ტექსტი წარმატებით მიება ვიზუალურ დამუშავებას!');
} else {
  console.log('⚠️ ზუსტი მატჩი ავტომატური ძებნით ვერ მოიძებნა.');
}
