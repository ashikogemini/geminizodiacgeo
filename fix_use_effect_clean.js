const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვასუფთავებთ ძველ არასწორ იმპორტებს და ვწერთ სუფთად
code = code.replace(/import\s+React[^\n]*\n/g, '');
code = "import React, { useState, useEffect } from 'react';\n" + code;

// 2. ვწმენდთ ძველ არასწორად ჩასმულ useEffect-ებს HomeScreen-დან
code = code.replace(/useEffect\s*\(\s*\(\s*\)\s*=>\s*\{[^}]*\}\s*,\s*\[\s*\]\s*\)/g, '');

// 3. ვპოულობთ function HomeScreen-ს და ვუმატებთ სუფთა useEffect-ს
let hsIdx = code.indexOf('function HomeScreen');
if (hsIdx !== -1) {
  let openBrace = code.indexOf('{', hsIdx);
  if (openBrace !== -1) {
    let effectInjection = `\n  useEffect(() => {\n    setIsShortModalVisible(true);\n  }, []);`;
    code = code.substring(0, openBrace + 1) + effectInjection + code.substring(openBrace + 1);
  }
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ useEffect და იმპორტები წარმატებით გასწორდა!');
