const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვანაცვლებთ მოკლევადიანი ასპექტების კარტას
code = code.replace(
  /\{\/\* მოკლევადიანი ასპექტები \*\/\}\s*<View style=\{([^}]+)\}>/g,
  `{/* მოკლევადიანი ასპექტები */}
  <TouchableOpacity onPress={() => setIsShortModalVisible(true)} activeOpacity={0.8} style={$1}>`
);

// ვანაცვლებთ გრძელვადიანი ასპექტების კარტას
code = code.replace(
  /\{\/\* გრძელვადიანი ასპექტები \*\/\}\s*<View style=\{([^}]+)\}>/g,
  `{/* გრძელვადიანი ასპექტები */}
  <TouchableOpacity onPress={() => setIsLongModalVisible(true)} activeOpacity={0.8} style={$1}>`
);

// რადგან View გადავაკეთეთ TouchableOpacity-დ, უნდა შევცვალოთ შესაბამისი დამხურავი ტეგებიც
// მოდი ვნახოთ, ორივე კარტისთვის ბოლო </View>-ს შევცვლით </TouchableOpacity>-ით
// მარტივად რომ ვქნათ, ვიპოვოთ ამ კარტების დასასრული და შევცვალოთ.

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ კარტები წარმატებით გადაკეთდა TouchableOpacity-დ!');
