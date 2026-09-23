const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამატებთ ახალ state-ს საწყისი კომპაქტური მოდალისთვის, თუ არ არის
if (!code.includes('isStartupModalVisible')) {
  code = code.replace(
    /const\s+\[isShortModalVisible[^;]*;/,
    `const [isStartupModalVisible, setIsStartupModalVisible] = useState(true);\n  const [isShortModalVisible, setIsShortModalVisible] = useState(false);\n  const [isLongModalVisible, setIsLongModalVisible] = useState(false);`
  );
}

// 2. ვცვლით useEffect-ს, რომ ჩართვისას კომპაქტური მოდალი გაიხსნას
code = code.replace(
  /useEffect\s*\(\s*\(\s*\)\s*=>\s*\{[^}]*\}\s*,\s*\[\s*\]\s*\)/g,
  `useEffect(() => {\n    setIsStartupModalVisible(true);\n  }, [])`
);

// 3. ვქმნით კომპაქტური საწყისი მოდალის JSX კოდს
const compactModalJSX = `
      {/* კომპაქტური საწყისი მოდალური ფანჯარა */}
      <Modal visible={isStartupModalVisible} animationType="fade" transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <View style={{backgroundColor: '#131b2e', borderRadius: 20, padding: 22, width: '100%', maxWidth: 360, borderWidth: 1, borderColor: '#d4af37'}}>
            
            <Text style={{color: '#d4af37', fontSize: 20, fontWeight: 'bold', marginBottom: 18, textAlign: 'center'}}>✨ მიმდინარე ასპექტები</Text>

            {/* მოკლევადიანი ასპექტის ბლოკი */}
            <View style={{backgroundColor: '#1a233a', borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}}>
              <Text style={{color: '#aaa', fontSize: 12, marginBottom: 4}}>⚡ მოკლევადიანი</Text>
              <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 8}} numberOfLines={1}>
                {shortTermAspects.find(item => item.end >= new Date().toISOString().split('T')[0])?.title |"აქტიური ასპექტი არ არის'}
              </Text>
              <TouchableOpacity onPress={() => { setIsStartupModalVisible(false); setIsShortModalVisible(true); }} style={{backgroundColor: '#d4af37', padding: 8, borderRadius: 8, alignItems: 'center'}}>
                <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 13}}>წაკითხვა</Text>
              </TouchableOpacity>
            </View>

            {/* გრძელვადიანი ასპექტის ბლოკი */}
            <View style={{backgroundColor: '#1a233a', borderRadius: 12, padding: 12, marginBottom: 18, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}}>
              <Text style={{color: '#aaa', fontSize: 12, marginBottom: 4}}>🪐 გრძელვადიანი</Text>
              <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 8}} numberOfLines={1}>
                {longTermAspects.find(item => item.end >= new Date().toISOString().split('T')[0])?.title |"აქტიური ასპექტი არ არის'}
              </Text>
              <TouchableOpacity onPress={() => { setIsStartupModalVisible(false); setIsLongModalVisible(true); }} style={{backgroundColor: '#d4af37', padding: 8, borderRadius: 8, alignItems: 'center'}}>
                <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 13}}>წაკითხვა</Text>
              </TouchableOpacity>
            </View>

            {/* დახურვის ღილაკი */}
            <TouchableOpacity onPress={() => setIsStartupModalVisible(false)} style={{backgroundColor: 'transparent', borderWidth: 1, borderColor: '#d4af37', padding: 10, borderRadius: 10, alignItems: 'center'}}>
              <Text style={{color: '#d4af37', fontWeight: 'bold', fontSize: 14}}>დახურვა</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
`;

// ვამატებთ ამ კომპაქტურ მოდალს HomeScreen-ის შიგნით არსებულ მოდალებთან ერთად
// ჯერ წავშალოთ ძველი საწყისი ეფექტები თუ აირეოდა და ჩავსვათ სუფთად
if (!code.includes('isStartupModalVisible')) {
  // თუ state არ იყო, ვამატებთ HomeScreen-ის სათავეში
  code = code.replace(
    'const [isShortModalVisible, setIsShortModalVisible] = useState(false);',
    'const [isStartupModalVisible, setIsStartupModalVisible] = useState(true);\n  const [isShortModalVisible, setIsShortModalVisible] = useState(false);'
  );
}

// ჩავამატოთ კომპაქტური მოდალი HomeScreen-ის შიგნით
let hsIdx = code.indexOf('function HomeScreen');
if (hsIdx !== -1) {
  let returnIdx = code.indexOf('return (', hsIdx);
  if (returnIdx !== -1) {
    let lastViewInHS = code.lastIndexOf('</View>', code.indexOf('function ', hsIdx + 20) > 0 ? code.indexOf('function ', hsIdx + 20) : code.length);
    if (lastViewInHS !== -1 && !code.includes('✨ მიმდინარე ასპექტები')) {
      code = code.substring(0, lastViewInHS) + compactModalJSX + '\n' + code.substring(lastViewInHS);
    }
  }
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ კომპაქტური საწყისი ფანჯარა წარმატებით დაინტეგრირდა!');
