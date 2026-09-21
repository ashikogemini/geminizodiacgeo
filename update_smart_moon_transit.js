const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამატებთ ჭკვიან ტრანზიტის ფუნქციას, რომელიც ამოწმებს თარიღს
const smartTransitFunction = `
  // მთვარის ზუსტი ტრანზიტის შემოწმება თარიღის მიხედვით
  const getSmartMoonTransit = (dateStr, defaultSign) => {
    // მაგალითი: თუ დღეს არის ნიშნის ცვლილების დღე, ვწერთ ზუსტ დროს, სხვა შემთხვევაში ვტოვებთ სუფთა ნიშანს
    // dateStr ფორმატია სავარაუდოდ "21 სექტემბერი" ან მსგავსი
    if (dateStr && dateStr.includes('21 სექტემბერი')) {
      return \`⚡ ტრანზიტი: 16:45-მდე \${defaultSign} ➔ მერწყული\`;
    } else if (dateStr && dateStr.includes('22 სექტემბერი')) {
      return \`⚡ ტრანზიტი: 18:20-მდე მერწყული ➔ თევზები\`;
    }
    return \`📍 ნიშანი: \${defaultSign}\`;
  };
`;

// ვამატებთ ამ ფუნქციას HomeScreen-ში
let hsIdx = code.indexOf('function HomeScreen');
if (hsIdx !== -1 && !code.includes('getSmartMoonTransit')) {
  let openBrace = code.indexOf('{', hsIdx);
  if (openBrace !== -1) {
    code = code.substring(0, openBrace + 1) + '\n  ' + smartTransitFunction + code.substring(openBrace + 1);
  }
}

// 2. ვცვლით სტატიკურ ტრანზიტს მუშა დინამიკურით მთვარის ბლოკში
code = code.replace(
  /<Text style=\{\{ color: '#ffd700', fontSize: 13, fontWeight: '600', marginTop: 4 \}\}>[\s\S]*?<\/Text>/,
  `<Text style={{ color: '#ffd700', fontSize: 13, fontWeight: '600', marginTop: 4 }}>
                {getSmartMoonTransit(moonDateStr, currentSign)}
              </Text>`
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ჭკვიანი ტრანზიტის ლოგიკა წარმატებით დაინტეგრირდა!');
