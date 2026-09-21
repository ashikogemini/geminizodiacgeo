const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვასუფთავებთ ძველ არასწორად ჩასმულ სთეითებს თუ არსებობს
code = code.replace(/const \[isShortModalVisible[^;]*;/g, '');
code.replace(/const \[isLongModalVisible[^;]*;/g, '');

// 2. ვრწმუნდებით, რომ useState იმპორტირებულია
if (!code.includes('useState')) {
  code = code.replace(/import React[^;]*;/, "import React, { useState } from 'react';");
}

// 3. ვათავსებთ სთეითებს ზუსტად App კომპონენტის დასაწყისში (export default function App() { შემდეგ)
const target = 'export default function App() {';
if (code.includes(target)) {
  code = code.replace(
    target,
    `${target}\n  const [isShortModalVisible, setIsShortModalVisible] = useState(false);\n  const [isLongModalVisible, setIsLongModalVisible] = useState(false);`
  );
} else {
  code = code.replace(
    'const App = () => {',
    `const App = () => {\n  const [isShortModalVisible, setIsShortModalVisible] = useState(false);\n  const [isLongModalVisible, setIsLongModalVisible] = useState(false);`
  );
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სთეითები წარმატებით დაინტეგრირდა კომპონენტის შიგნით!');
