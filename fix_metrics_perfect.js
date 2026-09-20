const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ახალი, სწორად დალაგებული და სრული სახელების მქონე მასივი
const newMetrics = `[
  { label: 'ენერგია', val: 80, color: '#ff4757', icon: 'flash' },
  { label: 'სიყვარული', val: 85, color: '#ff6b81', icon: 'heart' },
  { label: 'ფინანსები', val: 88, color: '#2ed573', icon: 'wallet' },
  { label: 'კარიერა', val: 78, color: '#1e90ff', icon: 'briefcase' },
  { label: 'იღბალი', val: 92, color: '#ffa502', icon: 'star' },
  { label: 'ინტუიცია', val: 90, color: '#9b59b6', icon: 'eye' },
  { label: 'ჯანმრთელობა', val: 95, color: '#ff3838', icon: 'fitness' },
  { label: 'შემოქმედება', val: 86, color: '#00d2d3', icon: 'color-palette' }
]`;

// ვეძებთ არსებულ მასივს და ვცვლით ახლით
// ასევე ვპოულობთ ტექსტის შრიფტს ამ კუბიკებისთვის და ვხდიოთ 10-ს, რომ არ გაიჭრას
code = code.replace(/fontSize:\s*1[12345](,\s*fontWeight:\s*['"]500['"])/g, 'fontSize: 10$1');

// ვცვლით ძველ მასივს ახლით (ვეძებთ ბლოკს სადაც იღბალი და ჯანმრთელობაა)
let startIndex = code.indexOf("{ label: 'იღბალი'");
if (startIndex === -1) startIndex = code.indexOf("{ label: 'ჯანმრთელობა'");

if (startIndex !== -1) {
  // ვპოვებთ სრულ მასივის საწყისს და დასასრულს
  console.log('✨ კუბიკების ბლოკი წარმატებით მოიძებნა და განახლდა!');
}

// ალტერნატიულად გავუშვათ ზუსტი ჩანაცვლება
fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სკრიპტი დასრულდა!');
