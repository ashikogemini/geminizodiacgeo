const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// სრულად ავტომატური ფუნქცია, რომელიც ნებისმიერი თარიღისთვის ამოწმებს ტრანზიტს
const automaticTransitFunction = `
  // სრულად ავტომატური მთვარის ტრანზიტის შემოწმება ნებისმიერი თარიღისთვის
  const getSmartMoonTransit = (date, defaultSign) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const dataStart = getMoonData(startOfDay);
    const dataEnd = getMoonData(endOfDay);

    const signStart = dataStart?.signName || defaultSign;
    const signEnd = dataEnd?.signName || defaultSign;

    // თუ დღის განმავლობაში ნიშანი იცვლება
    if (signStart !== signEnd) {
      return \`⚡ ტრანზიტი: \${signStart} ➔ \${signEnd}\`;
    }
    return \`📍 ნიშანი: \${defaultSign}\`;
  };
`;

// ვანაცვლებთ ძველ ფუნქციას ახლით
code = code.replace(
  /const getSmartMoonTransit = \([\s\S]*?};/g,
  automaticTransitFunction.trim()
) || code.replace(
  /const getSmartMoonTransit = \([\s\S]*?\};/g,
  automaticTransitFunction.trim()
);

// თუ ფუნქცია ჯერ არ იძებნება, ვამატებთ HomeScreen-ის სათავეში
if (!code.includes('const getSmartMoonTransit')) {
  let hsIdx = code.indexOf('function HomeScreen');
  if (hsIdx !== -1) {
    let openBrace = code.indexOf('{', hsIdx);
    if (openBrace !== -1) {
      code = code.substring(0, openBrace + 1) + '\n  ' + automaticTransitFunction + code.substring(openBrace + 1);
    }
  }
}

// ვწერთ კომპონენტში გადაცემასაც, რომ targetDate გაეგზავნოს ფუნქციას
code = code.replace(
  /\{getSmartMoonTransit\(moonDateStr,\s*currentSign\)\}/g,
  '{getSmartMoonTransit(targetDate, currentSign)}'
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სრულად ავტომატური ტრანზიტის ლოგიკა დაინტეგრირდა!');
