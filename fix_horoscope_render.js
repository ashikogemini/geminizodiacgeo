const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const idx = code.indexOf('{showFullHoroscope');
if (idx !== -1) {
  const sub = code.substring(0, idx);
  const textTagIdx = sub.lastIndexOf('<Text style={styles.bodyText}>');
  if (textTagIdx !== -1) {
    const endIdx = code.indexOf('</Text>', idx);
    if (endIdx !== -1) {
      const fullMatch = code.substring(textTagIdx, endIdx + '</Text>'.length);
      const expr = fullMatch.replace('<Text style={styles.bodyText}>', '').replace('</Text>', '').trim();
      const replacement = `{renderFormattedHoroscope(${expr})}`;
      code = code.replace(fullMatch, replacement);
      fs.writeFileSync('App.js', code, 'utf8');
      console.log('✅ იდეალურად ჩანაცვლდა!');
    } else {
      console.log('❌ </Text> ვერ მოიძებნა');
    }
  } else {
    console.log('❌ <Text style={styles.bodyText}> ვერ მოიძებნა');
  }
} else {
  console.log('❌ showFullHoroscope ვერ მოიძებნა');
}
