const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// მოკლევადიანი ასპექტების პადინგის გასწორება დინამიკურად
let idx1 = code.indexOf('მოკლევადიანი ასპექტები');
if (idx1 !== -1) {
  let sub = code.substring(idx1 - 250, idx1);
  let viewMatch = sub.lastIndexOf('<View style={[styles.card');
  if (viewMatch !== -1) {
    let absoluteViewIdx = (idx1 - 250) + viewMatch;
    let endOfTag = code.indexOf('>', absoluteViewIdx);
    if (endOfTag !== -1) {
      code = code.substring(0, absoluteViewIdx) + '<View style={[styles.card, { marginTop: 10, padding: 10 }]}>' + code.substring(endOfTag + 1);
      console.log('✅ მოკლევადიანი ასპექტების კარტა შეიკუმშა!');
    }
  }
}

// გრძელვადიანი ასპექტების პადინგის გასწორება დინამიკურად
let idx2 = code.indexOf('გრძელვადიანი ასპექტები');
if (idx2 !== -1) {
  let sub2 = code.substring(idx2 - 250, idx2);
  let viewMatch2 = sub2.lastIndexOf('<View style={[styles.card');
  if (viewMatch2 !== -1) {
    let absoluteViewIdx2 = (idx2 - 250) + viewMatch2;
    let endOfTag2 = code.indexOf('>', absoluteViewIdx2);
    if (endOfTag2 !== -1) {
      code = code.substring(0, absoluteViewIdx2) + '<View style={[styles.card, { marginTop: 14, padding: 10 }]}>' + code.substring(endOfTag2 + 1);
      console.log('✅ გრძელვადიანი ასპექტების კარტა შეიკუმშა!');
    }
  }
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ცვლილებები წარმატებით შეინახა!');
