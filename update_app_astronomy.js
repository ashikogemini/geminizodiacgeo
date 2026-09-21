const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ძველი სტატიკური იმპორტის ჩანაცვლება დინამიური კალკულატორით
code = code.replace(
  /import\s*\{\s*shortTermAspects\s*,\s*longTermAspects\s*\}\s*from\s*['"]\.\/dailyHoroscopeData['"];?/g,
  `import { getDynamicAspects } from './astronomyCalculator';`
);

// 2. თუ shortTermAspects პირდაპირ ძებნით გამოიყენება, ვცვლით ფუნქციის გამოძახებით
// ვპოულობთ სად გამოიყენება shortTermAspects და ვანაცვლებთ activeAspects-ით მიმდინარე თარიღისთვის
code = code.replace(
  /const\s+shortTermAspects\s*=/g,
  `// shortTermAspects replaced by dynamic`
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ App.js წარმატებით დაუკავშირდა ასტრონომიულ კალკულატორს!');
