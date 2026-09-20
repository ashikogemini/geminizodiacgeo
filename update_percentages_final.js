const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const newPercentagesBlock = `const percentages = [
  { label: 'ენერგია', val: 80, color: '#ff4757', icon: 'flash' },
  { label: 'სიყვარული', val: 85, color: '#ff6b81', icon: 'heart' },
  { label: 'ფინანსები', val: 88, color: '#2ed573', icon: 'wallet' },
  { label: 'კარიერა', val: 78, color: '#1e90ff', icon: 'briefcase' },
  { label: 'იღბალი', val: 92, color: '#ffa502', icon: 'star' },
  { label: 'ინტუიცია', val: 90, color: '#9b59b6', icon: 'eye' },
  { label: 'ჯანმრთელობა', val: 95, color: '#ff3838', icon: 'fitness' },
  { label: 'შემოქმედება', val: 86, color: '#00d2d3', icon: 'color-palette' }
];`;

let startIdx = code.indexOf('const percentages = [');
if (startIdx !== -1) {
  let endIdx = code.indexOf('];', startIdx);
  if (endIdx !== -1) {
    let oldBlock = code.substring(startIdx, endIdx + 2);
    code = code.replace(oldBlock, newPercentagesBlock);
    console.log('✅ percentages მასივი წარმატებით განახლდა!');
  }
}

// ვპოულობთ კუბიკების ტექსტის სტილს და ვხდიოთ fontSize: 10-ს, რომ არ გაიჭრას
code = code.replace(/(percentages\.map\([\s\S]*?)(fontSize:\s*)\d+/g, '$1$210');

fs.writeFileSync('App.js', code, 'utf8');
console.log('✨ App.js ფაილი შენახულია!');
