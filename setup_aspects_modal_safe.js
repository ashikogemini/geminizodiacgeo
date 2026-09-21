const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამოწმებთ და ვამატებთ აუცილებელ იმპორტებს
if (!code.includes('shortTermAspects')) {
  code = `import { shortTermAspects, longTermAspects } from './dailyHoroscopeData';\n` + code;
}

if (!code.includes('Modal')) {
  code = code.replace(/import \{([^}]+)\} from "react-native";/, 'import {$1, Modal} from "react-native";');
}

// 2. ვამატებთ state-ებს კომპონენტის თავში
if (!code.includes('isShortModalVisible')) {
  code = code.replace(
    /export default function App\(\) \{/,
    `export default function App() {\n  const [isShortModalVisible, setIsShortModalVisible] = useState(false);\n  const [isLongModalVisible, setIsLongModalVisible] = useState(false);`
  );
}

// 3. ვპოულობთ მოკლევადიანი და გრძელვადიანი ასპექტების სათაურებს და ვამატებთ onPress-ს შიდა ველებზე
// (ამისათვის ვწერთ მარტივ და სუფთა ჩანაცვლებას)

code = code.replace(
  /<View style=\[styles\.card, \{ marginTop: 10, padding: 12 \}\]>/,
  '<TouchableOpacity onPress={() => setIsShortModalVisible(true)} activeOpacity={0.8} style={[styles.card, { marginTop: 10, padding: 12 }]}>'
);

code = code.replace(
  /<View style=\[styles\.card, \{ marginTop: 14, padding: 12 \}\]>/,
  '<TouchableOpacity onPress={() => setIsLongModalVisible(true)} activeOpacity={0.8} style={[styles.card, { marginTop: 14, padding: 12 }]}>'
);

// ვცვლით შესაბამის დამხურავ </View>-ს </TouchableOpacity>-ით ამ ორი კარტისთვის
// ვპოულობთ მოკლევადიანი კარტის დასასრულს და ვასწორებთ
code = code.replace(
  /(მოკლევადიანი ასპექტები[\s\S]*?)<\/View>\s*<\/View>\s*<\/View>/,
  '$1</View></View></TouchableOpacity>'
);

code = code.replace(
  /(გრძელვადიანი ასპექტები[\s\S]*?)<\/View>\s*<\/View>\s*<\/View>/,
  '$1</View></View></TouchableOpacity>'
);

// 4. ვამატებთ მოდალური ფანჯრების JSX კოდს რენდერის ბოლოში
const modalsJSX = `
      {/* მოკლევადიანი ასპექტების მოდალური ფანჯარა */}
      <Modal visible={isShortModalVisible} animationType="slide" transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 20}}>
          <View style={{backgroundColor: '#131b2e', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#d4af37', maxHeight: '85%'}}>
            <Text style={{color: '#d4af37', fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center'}}>⚡ მოკლევადიანი ასპექტები</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {shortTermAspects
                .filter(item => item.end >= new Date().toISOString().split('T')[0])
                .map(item => (
                  <View key={item.id} style={{backgroundColor: '#1a233a', borderRadius: 12, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}}>
                    <Text style={{color: '#d4af37', fontSize: 16, fontWeight: 'bold', marginBottom: 6}}>{item.title}</Text>
                    <Text style={{color: '#aaa', fontSize: 13, marginBottom: 4}}>🪐 {item.planets}</Text>
                    <Text style={{color: '#ddd', fontSize: 13, marginBottom: 6}}>📅 პერიოდი: {item.period} (პიკი: {item.peak})</Text>
                    <Text style={{color: '#fff', fontSize: 13, lineHeight: 18, marginBottom: 8}}>✨ {item.impact}</Text>
                    <Text style={{color: '#8be9fd', fontSize: 13, lineHeight: 18, marginBottom: 6}}>🎯 სფეროები: {item.manifestation}</Text>
                    <Text style={{color: '#55efc4', fontSize: 13, lineHeight: 18, fontStyle: 'italic'}}>💡 რჩევა: {item.advice}</Text>
                  </View>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setIsShortModalVisible(false)} style={{marginTop: 15, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center'}}>
              <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* გრძელვადიანი ასპექტების მოდალური ფანჯარა */}
      <Modal visible={isLongModalVisible} animationType="slide" transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 20}}>
          <View style={{backgroundColor: '#131b2e', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#d4af37', maxHeight: '85%'}}>
            <Text style={{color: '#d4af37', fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center'}}>🪐 გრძელვადიანი ასპექტები</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {longTermAspects
                .filter(item => item.end >= new Date().toISOString().split('T')[0])
                .map(item => (
                  <View key={item.id} style={{backgroundColor: '#1a233a', borderRadius: 12, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}}>
                    <Text style={{color: '#d4af37', fontSize: 16, fontWeight: 'bold', marginBottom: 6}}>{item.title}</Text>
                    <Text style={{color: '#aaa', fontSize: 13, marginBottom: 4}}>🪐 {item.planets}</Text>
                    <Text style={{color: '#ddd', fontSize: 13, marginBottom: 6}}>📅 პერიოდი: {item.period} (პიკი: {item.peak})</Text>
                    <Text style={{color: '#ff7675', fontSize: 13, marginBottom: 6}}>⏳ ხანგრძლივობა: {item.duration}</Text>
                    <Text style={{color: '#fdcb6e', fontSize: 13, fontWeight: 'bold', marginBottom: 6}}>📌 მთავარი თემა: {item.theme}</Text>
                    <Text style={{color: '#fff', fontSize: 13, lineHeight: 18, marginBottom: 8}}>✨ გამოვლინება: {item.manifestation}</Text>
                    {item.cautions && <Text style={{color: '#ff9ff3', fontSize: 13, lineHeight: 18, marginBottom: 6}}>⚠️ გასათვალისწინებელი: {item.cautions}</Text>}
                    <Text style={{color: '#55efc4', fontSize: 13, lineHeight: 18, fontStyle: 'italic'}}>💡 რჩევა: {item.advice}</Text>
                  </View>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setIsLongModalVisible(false)} style={{marginTop: 15, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center'}}>
              <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
`;

if (!code.includes('isShortModalVisible') && code.includes('export default function App')) {
  const lastIndex = code.lastIndexOf('</View>');
  if (lastIndex !== -1) {
    code = code.substring(0, lastIndex) + modalsJSX + '\n' + code.substring(lastIndex);
  }
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ინტეგრაცია წარმატებით დასრულდა!');
