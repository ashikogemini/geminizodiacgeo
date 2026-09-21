const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ჯერ ამოვშალოთ მთავარი App-დან არასწორად ჩასმული სთეითები თუ არის
code = code.replace(/export default function App\(\) \{\s*const \[isShortModalVisible[^;]*;\s*const \[isLongModalVisible[^;]*;/g, 'export default function App() {');

// 2. ვპოულობთ function HomeScreen-ს და ვუმატებთ სთეითებს ზუსტად მის შიგნით
let hsIdx = code.indexOf('function HomeScreen');
if (hsIdx !== -1) {
  let openBrace = code.indexOf('{', hsIdx);
  if (openBrace !== -1) {
    let bodySnippet = code.substring(openBrace, openBrace + 300);
    if (!bodySnippet.includes('isShortModalVisible')) {
      let stateInjection = '\n  const [isShortModalVisible, setIsShortModalVisible] = useState(false);\n  const [isLongModalVisible, setIsLongModalVisible] = useState(false);';
      code = code.substring(0, openBrace + 1) + stateInjection + code.substring(openBrace + 1);
      console.log('✅ სთეითები წარმატებით დაემატა HomeScreen-ს!');
    }
  }
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ კოდი წარმატებით განახლდა!');
