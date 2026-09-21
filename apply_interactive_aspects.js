const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. იმპორტის შემოწმება
if (!code.includes('shortTermAspects')) {
  code = `import { shortTermAspects, longTermAspects } from './dailyHoroscopeData';\n` + code;
}

// 2. State-ების დამატება კომპონენტში, თუ არ არის
if (!code.includes('isShortModalVisible')) {
  code = code.replace(
    /export default function App\(\) \{/,
    `export default function App() {\n  const [isShortModalVisible, setIsShortModalVisible] = useState(false);\n  const [isLongModalVisible, setIsLongModalVisible] = useState(false);`
  );
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ინტერაქტიული ლოგიკა წარმატებით დაინტეგრირდა!');
