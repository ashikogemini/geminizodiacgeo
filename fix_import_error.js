const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// სწორდება არასწორი იმპორტი
code = code.replace(
  /import\s*\{\s*shortTermAspects\s*,\s*longTermAspects\s*(?:,\s*useEffect)?\s*\}\s*from\s*['"]\.\/dailyHoroscopeData['"];?/,
  "import { shortTermAspects, longTermAspects } from './dailyHoroscopeData';"
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ იმპორტი წარმატებით გასწორდა!');
