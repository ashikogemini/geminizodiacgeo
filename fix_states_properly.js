const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამოწმებთ და ვამატებთ useState იმპორტს, თუ არ არის
if (!code.includes('useState')) {
  code = code.replace(/import React[^;]*;/, "import React, { useState } from 'react';");
}

// 2. ვამატებთ სთეითებს კომპონენტის დასაწყისში, თუ ჯერ არ წერია
if (!code.includes('isShortModalVisible')) {
  // ვეძებთ function App-ს ან const App-ს
  if (code.includes('export default function App')) {
    code = code.replace(
      'export default function App() {',
      'export default function App() {\n  const [isShortModalVisible, setIsShortModalVisible] = useState(false);\n  const [isLongModalVisible, setIsLongModalVisible] = useState(false);'
    );
  } else if (code.includes('const App =')) {
    code = code.replace(
      'const App = () => {',
      'const App = () => {\n  const [isShortModalVisible, setIsShortModalVisible] = useState(false);\n  const [isLongModalVisible, setIsLongModalVisible] = useState(false);'
    );
  }
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სთეითები წარმატებით დაინტეგრირდა!');
