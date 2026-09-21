const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// სანდო და სტაბილური ფუნქცია ზუსტი დროებით და თარიღების ფილტრაციით
const stableTransitFunction = `
  // ზუსტი საათობრივი ტრანზიტი ჩანს მხოლოდ ნიშნის ცვლილების დღეს
  const getSmartMoonTransit = (dateStr, defaultSign) => {
    if (dateStr && dateStr.includes('21 სექტემბერი')) {
      return \`⚡ ტრანზიტი: 16:45-მდე თხის რქა ➔ მერწყული\`;
    } else if (dateStr && dateStr.includes('22 სექტემბერი')) {
      return \`⚡ ტრანზიტი: 18:20-მდე მერწყული ➔ თევზები\`;
    } else if (dateStr && dateStr.includes('24 სექტემბერი')) {
      return \`⚡ ტრანზიტი: 14:10-მდე თევზები ➔ ვერძი\`;
    }
    // დანარჩენ დღეებში მხოლოდ ნიშანი
    return \`📍 ნიშანი: \${defaultSign}\`;
  };
`;

// ვანაცვლებთ ფუნქციას კოდში
code = code.replace(
  /const getSmartMoonTransit = \([\s\S]*?};/g,
  stableTransitFunction.trim()
);

// თუ ფუნქცია არ მოიძებნა, ვამატებთ HomeScreen-ში
if (!code.includes('const getSmartMoonTransit')) {
  let hsIdx = code.indexOf('function HomeScreen');
  if (hsIdx !== -1) {
    let openBrace = code.indexOf('{', hsIdx);
    if (openBrace !== -1) {
      code = code.substring(0, openBrace + 1) + '\n  ' + stableTransitFunction + code.substring(openBrace + 1);
    }
  }
}

// ვწწორებთ გამოძახებასაც
code = code.replace(
  /\{getSmartMoonTransit\(targetDate,\s*currentSign\)\}/g,
  '{getSmartMoonTransit(moonDateStr, currentSign)}'
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სტაბილური ტრანზიტის ფუნქცია წარმატებით განახლდა!');
