const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვასუფთავებთ წინა არასწორ ადგილას ჩასმულ კოდს
code = code.replace(/\/\/ დინამიური ასპექტები ასტრონომიული კალკულატორიდან[\s\S]*?const longTermAspects = dynamicAspects\.longTerm;/g, '');

// 2. ვრწმუნდებით, რომ იმპორტი არის თავში
if (!code.includes("import { getDynamicAspects }")) {
  code = "import { getDynamicAspects } from './astronomyCalculator';\n" + code;
}

// 3. ვპოულობთ მთავარი კომპონენტის დასაწყისს და ვამატებთ ცვლადებს ფუნქციის დასაწყისში
const match = code.match(/(export\s+default\s+function\s+\w+\s*\([^)]*\)\s*\{|function\s+HomeScreen\s*\([^)]*\)\s*\{)/);
if (match) {
  const insertionPoint = match.index + match[0].length;
  const variablesCode = `
  // დინამიური ასპექტები ასტრონომიული კალკულატორიდან
  const dynamicAspects = getDynamicAspects('2026-09-21');
  const shortTermAspects = dynamicAspects.shortTerm;
  const longTermAspects = dynamicAspects.longTerm;
  `;
  code = code.slice(0, insertionPoint) + variablesCode + code.slice(insertionPoint);
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სკოპის შეცდომა წარმატებით გასწორდა!');
