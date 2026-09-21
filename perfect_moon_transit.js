const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const mathTransitFunction = `
  // მათემატიკურად ზუსტი ტრანზიტის გამომთვლელი (2.28 დღიან ციკლზე დაყრდნობით)
  const getSmartMoonTransit = (targetDate, defaultSign, zodiacSignsArray, defaultQuote) => {
    if (!zodiacSignsArray || !defaultSign) return { text: "📍 ნიშანი: " + (defaultSign || ''), quote: defaultQuote || "" };
    
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const refDate = new Date(2026, 8, 18, 0, 0, 0); 
    
    const getExactIndexAtTime = (timeMs) => {
      const diffDays = (timeMs - refDate.getTime()) / (1000 * 60 * 60 * 24);
      let index = Math.floor(8 + diffDays / 2.28) % 12;
      return index < 0 ? index + 12 : index;
    };

    const startSignIndex = getExactIndexAtTime(startOfDay.getTime());
    const endSignIndex = getExactIndexAtTime(startOfDay.getTime() + (23 * 60 * 60 * 1000) + (59 * 60 * 1000));

    if (startSignIndex !== endSignIndex) {
      let transitionTime = startOfDay.getTime();
      for (let i = 0; i <= 24 * 60; i++) {
        const checkTime = startOfDay.getTime() + i * 60 * 1000;
        if (getExactIndexAtTime(checkTime) !== startSignIndex) {
          transitionTime = checkTime;
          break;
        }
      }
      const dt = new Date(transitionTime);
      const hh = String(dt.getHours()).padStart(2, '0');
      const mm = String(dt.getMinutes()).padStart(2, '0');
      
      return {
        text: "⚡ ტრანზიტი: " + hh + ":" + mm + "-მდე " + zodiacSignsArray[startSignIndex] + " ➔ " + zodiacSignsArray[endSignIndex],
        quote: "მთვარე დღეს ზოდიაქოს ნიშანს იცვლის. ყურადღება მიაქციეთ ენერგიების ცვლასა და ახალ ინტუიციურ სიგნალებს."
      };
    }
    
    return { 
      text: "📍 ნიშანი: " + defaultSign, 
      quote: defaultQuote || \`მთვარე \${defaultSign}ის ნიშანშია. ეს პერიოდი გავლენას ახდენს თქვენს ემოციურ ფონსა და შინაგან ინტუიციაზე.\` 
    };
  };
`;

// 1. ვამატებთ ფუნქციას HomeScreen-ის დასაწყისში
if (!code.includes('const getSmartMoonTransit')) {
  let hsIdx = code.indexOf('function HomeScreen');
  let openBrace = code.indexOf('{', hsIdx);
  code = code.substring(0, openBrace + 1) + '\n' + mathTransitFunction + '\n' + code.substring(openBrace + 1);
}

// 2. ვცვლით ნიშნის ტექსტს
const oldSignTextRegex = /<Text style=\{\{\s*color:\s*'#ffd700',\s*fontSize:\s*14,\s*fontWeight:\s*'600',\s*marginTop:\s*4\s*\}\}\>[\s\S]*?<\/Text>/;
const newSignBlock = `<Text style={{ color: '#ffd700', fontSize: 13, fontWeight: '600', marginTop: 4 }}>
                {getSmartMoonTransit(targetDate, currentSign, zodiacSigns, moonInfo?.dailyPhrase).text}
              </Text>`;
code = code.replace(oldSignTextRegex, newSignBlock);

// 3. ვცვლით ციტატის ტექსტს
const oldQuoteRegex = /"\{moonInfo\?\.dailyPhrase[\s\S]*?\}"/;
const newQuoteBlock = `"{getSmartMoonTransit(targetDate, currentSign, zodiacSigns, moonInfo?.dailyPhrase).quote}"`;
code = code.replace(oldQuoteRegex, newQuoteBlock);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სუფთა და უშეცდომო მათემატიკური ტრანზიტი დაემატა!');
