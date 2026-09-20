const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

if (!code.includes('GEMINI_ENCYCLOPEDIA')) {
  code = "import { GEMINI_ENCYCLOPEDIA } from './geminiData';\n" + code;
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ geminiData-ს იმპორტი წარმატებით დაემატა!');
} else {
  console.log('✅ იმპორტი უკვე არსებობს!');
}
