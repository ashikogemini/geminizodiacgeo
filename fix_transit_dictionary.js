const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ზუსტი ლექსიკონი ტრანზიტის დღეებისთვის
const dictionaryTransitFunction = `
  // მთვარის ზუსტი ტრანზიტების ლექსიკონი
  const getSmartMoonTransit = (moonDateStr, defaultSign) => {
    // ვასუფთავებთ სტრიქონს ზედმეტი გამოტოვებებისგან
    const cleanDate = moonDateStr ? moonDateStr.trim() : '';

    const transitMap = {
      '21 სექტემბერი': '⚡ ტრანზიტი: 16:45-მდე თხის რქა ➔ მერწყული',
      '22 სექტემბერი': '⚡ ტრანზიტი: 18:20-მდე მერწყული ➔ თევზები',
      '24 სექტემბერი': '⚡ ტრანზიტი: 14:10-მდე თევზები ➔ ვერძი',
      '26 სექტემბერი': '⚡ ტრანზიტი: 19:30-მდე ვერძი ➔ კურო',
      '29 სექტემბერი': '⚡ ტრანზიტი: 12:00-მდე კურო ➔ ტყუპები'
    };

    if (transitMap[cleanDate]) {
      return transitMap[cleanDate];
    }
    return \`📍 ნიშანი: \${defaultSign}\`;
  };
`;

// ვანაცვლებთ ძველ ფუნქციას ახლით
code = code.replace(
  /const getSmartMoonTransit = \([\s\S]*?};/g,
  dictionaryTransitFunction.trim()
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ტრანზიტების ლექსიკონი წარმატებით განახლდა!');
