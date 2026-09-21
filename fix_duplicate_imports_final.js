const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვშლით ყველა ძველ რეაქტის და იმპორტის არევის ვარიანტს
code = code.replace(/import\s+[^;]*from\s+['"]react['"];?/g, '');
code = code.replace(/import\s*\{\s*useState\s*\}\s*from\s+['"]react['"];?/g, '');
code = code.replace(/import\s*\{\s*useEffect\s*\}\s*from\s+['"]react['"];?/g, '');

// 2. ვამატებთ ერთ სუფთა, სწორ იმპორტს ფაილის თავში
code = "import React, { useState, useEffect } from 'react';\n" + code;

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ იმპორტები წარმატებით გასწორდა!');
