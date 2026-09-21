const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. მოკლევადიანი ასპექტები
let shortIdx = code.indexOf('მოკლევადიანი ასპექტები');
if (shortIdx !== -1) {
  let subBefore = code.substring(0, shortIdx);
  let openViewIdx = subBefore.lastIndexOf('<View style={[styles.card');
  if (openViewIdx !== -1) {
    code = code.substring(0, openViewIdx) + 
           '<TouchableOpacity onPress={() => setIsShortModalVisible(true)} activeOpacity={0.8} style={[styles.card' + 
           code.substring(openViewIdx + '<View style={[styles.card'.length);
           
    let subAfter = code.substring(openViewIdx);
    let closeIdx = subAfter.indexOf('</View>\n              </View>');
    if (closeIdx !== -1) {
      let absoluteCloseIdx = openViewIdx + closeIdx;
      code = code.substring(0, absoluteCloseIdx) + 
             '</TouchableOpacity>' + 
             code.substring(absoluteCloseIdx + '</View>'.length);
    }
  }
}

// 2. გრძელვადიანი ასპექტები
let longIdx = code.indexOf('გრძელვადიანი ასპექტები');
if (longIdx !== -1) {
  let subBefore = code.substring(0, longIdx);
  let openViewIdx = subBefore.lastIndexOf('<View style={[styles.card');
  if (openViewIdx !== -1) {
    code = code.substring(0, openViewIdx) + 
           '<TouchableOpacity onPress={() => setIsLongModalVisible(true)} activeOpacity={0.8} style={[styles.card' + 
           code.substring(openViewIdx + '<View style={[styles.card'.length);
           
    let subAfter = code.substring(openViewIdx);
    let closeIdx = subAfter.indexOf('</View>\n              </View>');
    if (closeIdx !== -1) {
      let absoluteCloseIdx = openViewIdx + closeIdx;
      code = code.substring(0, absoluteCloseIdx) + 
             '</TouchableOpacity>' + 
             code.substring(absoluteCloseIdx + '</View>'.length);
    }
  }
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ კარტები წარმატებით დაკავშირდა მოდალურ ფანჯრებთან!');
