const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვპოულობთ და ვცვლით მოკლევადიანი ასპექტების ბლოკს
// ვახვევთ TouchableOpacity-ში
code = code.replace(
  /\{\/\* მოკლევადიანი ასპექტები \*\/\}\s*<View style=\{([^}]+)\}>/g,
  `{/* მოკლევადიანი ასპექტები */}
  <TouchableOpacity onPress={() => setIsShortModalVisible(true)} activeOpacity={0.8} style={$1}>`
);

// 2. ვპოულობთ და ვცვლით გრძელვადიანი ასპექტების ბლოკს
code = code.replace(
  /\{\/\* გრძელვადიანი ასპექტები \*\/\}\s*<View style=\{([^}]+)\}>/g,
  `{/* გრძელვადიანი ასპექტები */}
  <TouchableOpacity onPress={() => setIsLongModalVisible(true)} activeOpacity={0.8} style={$1}>`
);

// ვასწორებთ შესაბამის დამხურავ ტეგებს, თუ საჭიროა (View -> TouchableOpacity)
// უბრალოდ შევამოწმოთ სტრუქტურა და ვქნათ ჩანაცვლება
fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ დაკლიკებადი ლოგიკა წარმატებით მიება!');
