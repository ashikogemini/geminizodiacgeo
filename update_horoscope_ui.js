const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const targetStart = `<Text style={styles.bodyText}>
      {showFullHoroscope`;

if (code.includes(targetStart)) {
  let startIndex = code.indexOf(targetStart);
  let endIndex = code.indexOf('</Text>', startIndex) + '</Text>'.length;
  
  let originalBlock = code.substring(startIndex, endIndex);
  let expr = originalBlock.replace('<Text style={styles.bodyText}>', '').replace('</Text>', '').trim();
  
  let newBlock = `{renderFormattedHoroscope(${expr})}`;
  
  code = code.replace(originalBlock, newBlock);
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ დღის ჰოროსკოპის ვიზუალი წარმატებით განახლდა!');
} else {
  console.log('⚠️ ბლოკი ვერ მოიძებნა.');
}
