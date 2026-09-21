const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// მოკლევადიანი ასპექტების კარტის პადინგის შეცვლა
let idx1 = code.indexOf('მოკლევადიანი ასპექტები');
if (idx1 !== -1) {
  let viewIdx = code.indexOf('<View style={[styles.card, { marginTop: 10 }]}>', idx1 - 100);
  if (viewIdx !== -1) {
    code = code.substring(0, viewIdx) + '<View style={[styles.card, { marginTop: 10, padding: 12 }]}>' + code.substring(viewIdx + '<View style={[styles.card, { marginTop: 10 }]}>'.length);
    console.log('✅ მოკლევადიანი ასპექტების პადინგი განახლდა!');
  }
}

// გრძელვადიანი ასპექტების კარტის პადინგის შეცვლა
let idx2 = code.indexOf('გრძელვადიანი ასპექტები');
if (idx2 !== -1) {
  let viewIdx2 = code.indexOf('<View style={[styles.card, { marginTop: 14 }]}>', idx2 - 100);
  if (viewIdx2 !== -1) {
    code = code.substring(0, viewIdx2) + '<View style={[styles.card, { marginTop: 14, padding: 12 }]}>' + code.substring(viewIdx2 + '<View style={[styles.card, { marginTop: 14 }]}>'.length);
    console.log('✅ გრძელვადიანი ასპექტების პადინგი განახლდა!');
  }
}

fs.writeFileSync('App.js', code, 'utf8');
