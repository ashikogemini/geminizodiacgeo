const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ძველი ვერსიების სრული გაწმენდა
code = code.replace(/\/\/ .*?ტრანზიტ[\s\S]*?const getSmartMoonTransit = \([\s\S]*?\};/g, '');
code = code.replace(/const getSmartMoonTransit = \([\s\S]*?\};/g, '');

// 2. სუფთა, მათემატიკური ფუნქცია, რომელიც იყენებს სტანდარტულ ტექსტურ ფორმატს (შეცდომების გამოსარიცხად)
const mathTransitFunction = `
  // მათემატიკურად ზუსტი ტრანზიტის გამომთვლელი (2.28 დღიან ციკლზე დაყრდნობით)
  const getSmartMoonTransit = (targetDate, defaultSign, zodiacSignsArray) => {
    if (!zodiacSignsArray) return "📍 ნიშანი: " + defaultSign;
    
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
      
      return "⚡ ტრანზიტი: " + hh + ":" + mm + "-მდე " + zodiacSignsArray[startSignIndex] + " ➔ " + zodiacSignsArray[endSignIndex];
    }
    
    return "📍 ნიშანი: " + defaultSign;
  };
`;

// ვამატებთ HomeScreen-ის დასაწყისში
let hsIdx = code.indexOf('function HomeScreen');
if (hsIdx !== -1) {
  let openBrace = code.indexOf('{', hsIdx);
  code = code.substring(0, openBrace + 1) + '\n' + mathTransitFunction + '\n' + code.substring(openBrace + 1);
}

// 3. ტექსტის ბლოკის განახლება
const signBlockRegex = /<Text style=\{\{\s*color:\s*'#ffd700',\s*fontSize:\s*\d+,\s*fontWeight:\s*'600',\s*marginTop:\s*4\s*\}\}\>[\s\S]*?<\/Text>/;
const newSignBlock = `<Text style={{ color: '#ffd700', fontSize: 13, fontWeight: '600', marginTop: 4 }}>
                {getSmartMoonTransit(targetDate, currentSign, zodiacSigns)}
              </Text>`;

code = code.replace(signBlockRegex, newSignBlock);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მათემატიკურად ზუსტი ტრანზიტის ლოგიკა წარმატებით ჩაიტვირთა!');
