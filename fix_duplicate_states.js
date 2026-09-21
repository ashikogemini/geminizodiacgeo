const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვშლით ყველა ძველ საწყის და მოდალის სთეითს HomeScreen-დან, რომ ორმაგი ჩაწერა არ იყოს
code = code.replace(/const\s+\[isStartupModalVisible[^;]*;/g, '');
code = code.replace(/const\s+\[isShortModalVisible[^;]*;/g, '');
code = code.replace(/const\s+\[isLongModalVisible[^;]*;/g, '');

// 2. ვპოულობთ function HomeScreen-ს და ვწერთ ერთხელ, სუფთად
let hsIdx = code.indexOf('function HomeScreen');
if (hsIdx !== -1) {
  let openBrace = code.indexOf('{', hsIdx);
  if (openBrace !== -1) {
    let cleanStates = `\n  const [isStartupModalVisible, setIsStartupModalVisible] = useState(true);\n  const [isShortModalVisible, setIsShortModalVisible] = useState(false);\n  const [isLongModalVisible, setIsLongModalVisible] = useState(false);`;
    code = code.substring(0, openBrace + 1) + cleanStates + code.substring(openBrace + 1);
  }
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სთეითები გაიწმინდა და სუფთად ჩაჯდა!');
