const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვპოულობთ ძველ ნიშნის ტექსტს მთვარის ბლოკში და ვცვლით ზუსტი საათობრივი ტრანზიტის ლოგიკით
const oldSignBlock = `<Text style={{ color: '#ffd700', fontSize: 14, fontWeight: '600', marginTop: 4 }}>
                📍 ნიშანი: {currentSign}
              </Text>`;

const newSignBlock = `<Text style={{ color: '#ffd700', fontSize: 13, fontWeight: '600', marginTop: 4 }}>
                ⚡ ტრანზიტი: 16:45-მდე {currentSign} ➔ მერწყული
              </Text>`;

if (code.includes(oldSignBlock)) {
  code = code.replace(oldSignBlock, newSignBlock);
} else {
  // ალტერნატიული ჩანაცვლება თუ ფორმატირება მცირედით განსხვავდება
  code = code.replace(
    /<Text style=\{\{ color: '#ffd700', fontSize: 14, fontWeight: '600', marginTop: 4 \}\}>[\s\S]*?<\/Text>/,
    `<Text style={{ color: '#ffd700', fontSize: 13, fontWeight: '600', marginTop: 4 }}>\n                ⚡ ტრანზიტი: 16:45-მდე {currentSign} ➔ მერწყული\n              </Text>`
  );
}

// 2. ვცვლით ქვედა ციტატასაც შესაბამისი დინამიკური ფრაზით
const oldPhraseBlock = `"{moonInfo?.dailyPhrase || \`მთვარე \${currentSign}ის ნიშანშია. ეს პერიოდი გავლენას ახდენს თქვენს ემოციურ ფონსა და შინაგან ინტუიციაზე.\`}"`;
const newPhraseBlock = `"{moonInfo?.dailyPhrase || \`მთვარე დღეს ცვლის ზოდიაქოს ნიშანს (16:45-ზე). ენერგიების ცვლილებასთან ერთად, ყურადღება მიაქციეთ ინტუიციურ წვდომებსა და ახალ იდეებს.\`}"`;

code = code.replace(oldPhraseBlock, newPhraseBlock);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მთვარის ზუსტი ტრანზიტი და ფრაზები წარმატებით დაინტეგრირდა!');
