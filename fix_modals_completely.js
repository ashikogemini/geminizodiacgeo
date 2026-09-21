const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვრწმუნდებით, რომ getDynamicAspects იმპორტი თავშია
if (!code.includes("import { getDynamicAspects }")) {
  code = "import { getDynamicAspects } from './astronomyCalculator';\n" + code;
}

// 2. ვრწმუნდებით, რომ dynamicAspects განსაზღვრულია კომპონენტში
if (!code.includes("const dynamicAspects = getDynamicAspects")) {
  const match = code.match(/(export\s+default\s+function\s+\w+\s*\([^)]*\)\s*\{|function\s+HomeScreen\s*\([^)]*\)\s*\{)/);
  if (match) {
    const insertionPoint = match.index + match[0].length;
    code = code.slice(0, insertionPoint) + `
  // დინამიური ასპექტები ასტრონომიული კალკულატორიდან
  const dynamicAspects = getDynamicAspects(selectedDate || '2026-09-21');
  const shortTermAspects = dynamicAspects.shortTerm;
  const longTermAspects = dynamicAspects.longTerm;
    ` + code.slice(insertionPoint);
  }
}

console.log('✅ ასტრონომიული კალკულატორი წარმატებით ინტეგრირდა!');
fs.writeFileSync('App.js', code, 'utf8');
