const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამატებთ იმპორტს თავში
if (!code.includes("import { getDynamicAspects }")) {
  code = "import { getDynamicAspects } from './astronomyCalculator';\n" + code;
}

// 2. ვამატებთ დინამიურ ასპექტებს მთავარი კომპონენტის დასაწყისში
const match = code.match(/(export\s+default\s+function\s+\w+\s*\([^)]*\)\s*\{|function\s+HomeScreen\s*\([^)]*\)\s*\{)/);
if (match && !code.includes("const dynamicAspects = getDynamicAspects")) {
  const insertionPoint = match.index + match[0].length;
  code = code.slice(0, insertionPoint) + `
  const dynamicAspects = getDynamicAspects(selectedDate |"2026-09-21');
  const shortTermAspects = dynamicAspects.shortTerm;
  const longTermAspects = dynamicAspects.longTerm;
  ` + code.slice(insertionPoint);
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ დინამიური ასპექტები უსაფრთხოდ ინტეგრირდა!');
