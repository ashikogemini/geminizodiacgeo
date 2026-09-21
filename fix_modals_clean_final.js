const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ფუნქცია ძველი მოდალის ბლოკის ამოსაშლელად
function removeModalBlock(code, modalVarName) {
  let marker = `visible={${modalVarName}}`;
  let idx = code.indexOf(marker);
  if (idx === -1) return code;
  
  let modalStart = code.lastIndexOf('<Modal', idx);
  if (modalStart === -1) modalStart = idx;
  
  let count = 0;
  let pos = modalStart;
  let modalEnd = -1;
  
  while (pos < code.length) {
    if (code.startsWith('<Modal', pos)) {
      count++;
      pos += 6;
    } else if (code.startsWith('</Modal>', pos)) {
      count--;
      if (count === 0) {
        modalEnd = pos + 8;
        break;
      }
      pos += 8;
    } else {
      pos++;
    }
  }
  
  if (modalEnd !== -1) {
    return code.substring(0, modalStart) + code.substring(modalEnd);
  }
  return code;
}

// 1. ვშლით ძველ მოკლევადიან და გრძელვადიან სრულ მოდალებს
code = removeModalBlock(code, 'isShortModalVisible');
code = removeModalBlock(code, 'isLongModalVisible');

// 2. ვამზადებთ სუფთა მოდალებს მხოლოდ "დახურვა" ღილაკით
const cleanShortModal = `
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
`;

const cleanLongModal = `
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

// 3. ვურთავთ სუფთა მოდალებს HomeScreen-ში
let hsIdx = code.indexOf('function HomeScreen');
if (hsIdx !== -1) {
  let lastViewIdx = code.lastIndexOf('</View>', code.indexOf('function ', hsIdx + 20) > 0 ? code.indexOf('function ', hsIdx + 20) : code.length);
  if (lastViewIdx !== -1) {
    code = code.substring(0, lastViewIdx) + cleanShortModal + '\n' + cleanLongModal + '\n' + code.substring(lastViewIdx);
  }
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მოდალები წარმატებით განახლდა!');
