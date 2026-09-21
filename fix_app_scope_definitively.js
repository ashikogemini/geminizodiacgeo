const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვრწმუნდებით, რომ useState იმპორტირებულია
if (!code.includes('useState')) {
  code = code.replace(/import\s+React[^;]*;/g, "import React, { useState } from 'react';");
}

// 2. ვპოულობთ App კომპონენტის დასაწყისს და ვამატებთ სთეითებს ზუსტად შიგნით
let appFuncIdx = code.indexOf('export default function App()');
if (appFuncIdx === -1) {
  appFuncIdx = code.indexOf('const App = () =>');
}

if (appFuncIdx !== -1) {
  let openBraceIdx = code.indexOf('{', appFuncIdx);
  if (openBraceIdx !== -1) {
    let bodySnippet = code.substring(openBraceIdx, openBraceIdx + 400);
    if (!bodySnippet.includes('isShortModalVisible')) {
      let stateInjection = '\n  const [isShortModalVisible, setIsShortModalVisible] = useState(false);\n  const [isLongModalVisible, setIsLongModalVisible] = useState(false);';
      code = code.substring(0, openBraceIdx + 1) + stateInjection + code.substring(openBraceIdx + 1);
      console.log('✅ სთეითები წარმატებით ჩაჯდა App კომპონენტში!');
    } else {
      console.log('ℹ️ სთეითები უკვე არსებობს.');
    }
  }
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ფაილი განახლდა!');
