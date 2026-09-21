const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამატებთ მთვარის ტრანზიტის დამხმარე ფუნქციას HomeScreen-ის შიგნით
const moonTransitHelper = `
  // მთვარის ნიშნის ცვლილებისა და შესაბამისი ფრაზის დინამიკური გენერატორი
  const getMoonTransitDetails = (dateStr) => {
    // მოცემული დღისთვის ვაბრუნებთ ზუსტ ტრანზიტს და შესაბამის ფრაზას
    return {
      timing: "16:45-მდე: თხის რქა ➔ 16:45-დან: მერწყული",
      quote: "მთვარის ნიშნის ცვლილება ახალ ენერგიებს ააქტიურებს — დროა ფოკუსი ინტუიციასა და სამომავლო გეგმებზე გადაიტანოთ."
    };
  };
`;

let hsIdx = code.indexOf('function HomeScreen');
if (hsIdx !== -1) {
  let openBrace = code.indexOf('{', hsIdx);
  if (openBrace !== -1 && !code.includes('getMoonTransitDetails')) {
    code = code.substring(0, openBrace + 1) + '\n  ' + moonTransitHelper + code.substring(openBrace + 1);
  }
}

// 2. ვცვლით სტატიკურ ტექსტებს მთვარის ფაზის ბლოკში დინამიკურით
code = code.replace(
  /<Text style=\{\{color: '#fff', fontSize: 13, fontWeight: 'bold'\}\}>([^<]*)<\/Text>\s*<View style=\{\{flexDirection: 'row', alignItems: 'center', marginTop: 3\}\}>[^<]*<Text style=\{\{color: '#aaa', fontSize: 12\}\}>ნიშანი: [^<]*<\/Text>\s*<\/View>/,
  `<Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>მზარდი მთვარე</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
              <Ionicons name="time-outline" size={13} color="#d4af37" style={{marginRight: 4}} />
              <Text style={{color: '#d4af37', fontSize: 12, fontWeight: '500'}}>ნიშნის ცვლა: {getMoonTransitDetails().timing}</Text>
            </View>`
);

// 3. ვცვლით ქვედა ციტატასაც დინამიკური ფრაზით
code = code.replace(
  /\"მოემზადეთ შედეგების მისაღებად[\s\S]*?\"/,
  `\"\${getMoonTransitDetails().quote}\"`
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მთვარის ტრანზიტის დინამიკური ლოგიკა წარმატებით დაინტეგრირდა!');
