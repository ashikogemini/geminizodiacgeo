const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const dynamicCode = `
  // დინამიური პროცენტების გენერატორი (იცვლება ყოველდღე და ზოდიაქოს მიხედვით)
  const getDynamicPercent = (label) => {
    const today = new Date().toISOString().split('T')[0];
    const sign = zodiacSigns[signIndex] || '';
    const str = label + sign + today;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return 70 + (Math.abs(hash) % 29); // აბრუნებს 70%-დან 98%-მდე
  };

  const percentages = [
    { label: 'ენერგია', val: getDynamicPercent('ენერგია'), color: '#ff4757', icon: 'flash' },
    { label: 'სიყვარული', val: getDynamicPercent('სიყვარული'), color: '#ff6b81', icon: 'heart' },
    { label: 'ფინანსები', val: getDynamicPercent('ფინანსები'), color: '#2ed573', icon: 'wallet' },
    { label: 'კარიერა', val: getDynamicPercent('კარიერა'), color: '#1e90ff', icon: 'briefcase' },
    { label: 'იღბალი', val: getDynamicPercent('იღბალი'), color: '#ffa502', icon: 'star' },
    { label: 'ინტუიცია', val: getDynamicPercent('ინტუიცია'), color: '#9b59b6', icon: 'eye' },
    { label: 'ჯანმრთელობა', val: getDynamicPercent('ჯანმრთელობა'), color: '#ff4757', icon: 'heart-pulse' },
    { label: 'შემოქმედება', val: getDynamicPercent('შემოქმედება'), color: '#00cec9', icon: 'palette' }
  ];
`;

// ვანაცვლებთ ძველ, სტატიკურ მასივს ახალი დინამიური ლოგიკით
code = code.replace(/const percentages = \[\s*\{\s*label:\s*['"]ენერგია['"][\s\S]*?\];/m, dynamicCode.trim());

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მეტრიკები წარმატებით გახდა დინამიური!');
