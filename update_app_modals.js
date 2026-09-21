const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. იმპორტის შემოწმება
if (!code.includes('shortTermAspects')) {
  code = `import { shortTermAspects, longTermAspects } from './dailyHoroscopeData';\n` + code;
}

// 2. State-ების დამატება კომპონენტში
if (!code.includes('isShortModalVisible')) {
  code = code.replace(
    /export default function App\(\) \{/,
    `export default function App() {\n  const [isShortModalVisible, setIsShortModalVisible] = useState(false);\n  const [isLongModalVisible, setIsLongModalVisible] = useState(false);`
  );
}

// 3. Modal-ის იმპორტი react-native-დან
if (!code.includes('Modal')) {
  code = code.replace(/import \{([^}]+)\} from "react-native";/, 'import {$1, Modal} from "react-native";');
}

// 4. ვპოულობთ და ვუკავშირებთ onPress ღილაკებს მოკლევადიანი და გრძელვადიანი ასპექტებისთვის
code = code.replace(
  /<TouchableOpacity([^>]*?)name="flash-outline"/s,
  '<TouchableOpacity onPress={() => setIsShortModalVisible(true)} name="flash-outline"'
);

code = code.replace(
  /<TouchableOpacity([^>]*?)name="planet-outline"/s,
  '<TouchableOpacity onPress={() => setIsLongModalVisible(true)} name="planet-outline"'
);

// თუ უკვე აქვს onPress, უბრალოდ ვანაცვლებთ სწორი ფუნქციით
code = code.replace(/onPress=\{[^}]+\}(\s*[^>]*name="flash-outline")/g, 'onPress={() => setIsShortModalVisible(true)}$1');
code = code.replace(/onPress=\{[^}]+\}(\s*[^>]*name="planet-outline")/g, 'onPress={() => setIsLongModalVisible(true)}$1');

// 5. მოდალური ფანჯრების JSX კოდის დამატება ფაილის ბოლოში (return-ის შიგნით)
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

// ვამატებთ მოდალებს ფაილის ბოლოში (ბოლო </View>-ს წინ)
if (!code.includes('isShortModalVisible') && code.includes('export default function App')) {
  // ვპოულობთ ბოლო ორ ტეგს და მათ წინ ვურთავთ მოდალებს
  const lastIndex = code.lastIndexOf('</View>');
  if (lastIndex !== -1) {
    code = code.substring(0, lastIndex) + modalsJSX + '\n' + code.substring(lastIndex);
  }
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ აპლიკაცია წარმატებით განახლდა მოდალური ფანჯრებით!');
