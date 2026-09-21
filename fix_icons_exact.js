const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვანაცვლებთ არასწორ აიქონებს სანდო სახელებით
code = code.replace(
  /\{ label: 'ჯანმრთელობა',\s*val: getDynamicPercent\('ჯანმრთელობა'\),\s*color: '#ff4757',\s*icon: '[^']+' \}/,
  "{ label: 'ჯანმრთელობა', val: getDynamicPercent('ჯანმრთელობა'), color: '#ff4757', icon: 'fitness' }"
);

code = code.replace(
  /\{ label: 'შემოქმედება',\s*val: getDynamicPercent\('შემოქმედება'\),\s*color: '#00cec9',\s*icon: '[^']+' \}/,
  "{ label: 'შემოქმედება', val: getDynamicPercent('შემოქმედება'), color: '#00cec9', icon: 'color-palette' }"
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ აიქონები წარმატებით გასწორდა!');
