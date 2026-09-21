const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// დარწმუნდებით, რომ იმპორტი თავშია
if (!code.includes('getDynamicAspects')) {
  code = "import { getDynamicAspects } from './astronomyCalculator';\n" + code;
}

// მოდალური ფანჯრის წინ ვამატებთ დინამიური ასპექტების გამოძახებას
const target = '{/* კომპაქტური საწყისი მოდალური ფანჯარა */}';
const replacement = `
      // დინამიური ასპექტები ასტრონომიული კალკულატორიდან
      const dynamicAspects = getDynamicAspects('2026-09-21');
      const shortTermAspects = dynamicAspects.shortTerm;
      const longTermAspects = dynamicAspects.longTerm;

      {/* კომპაქტური საწყისი მოდალური ფანჯარა */}`;

if (code.includes(target) && !code.includes('const dynamicAspects')) {
  code = code.replace(target, replacement);
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ასპექტების ცვლადები წარმატებით დაინტეგრირდა!');
